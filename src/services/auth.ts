import axios from 'axios';

interface TokenResponse {
  access_token: string;
  expires_in: number;
}

interface AuthError {
  message: string;
  status?: number;
  details?: string;
}

class AuthService {
  private accessToken: string | null = null;
  private tokenExpiry: number | null = null;

  private async refreshAccessToken(): Promise<string> {
    try {
      const response = await axios.post<TokenResponse>('/api/auth/token');
      
      if (!response.data?.access_token) {
        throw new Error('Invalid token response');
      }

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in * 1000);
      return this.accessToken;
    } catch (error) {
      const authError: AuthError = {
        message: 'Failed to obtain access token',
        status: axios.isAxiosError(error) ? error.response?.status : undefined,
        details: axios.isAxiosError(error) ? error.response?.data?.error?.message : error instanceof Error ? error.message : 'Unknown error'
      };

      console.error('Auth Error:', JSON.stringify(authError));
      throw new Error(authError.message);
    }
  }

  async getAccessToken(): Promise<string> {
    if (!this.accessToken || !this.tokenExpiry || Date.now() >= this.tokenExpiry) {
      return this.refreshAccessToken();
    }
    return this.accessToken;
  }

  async getAuthHeaders(): Promise<Record<string, string>> {
    const token = await this.getAccessToken();
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  clearToken(): void {
    this.accessToken = null;
    this.tokenExpiry = null;
  }
}

export const authService = new AuthService();