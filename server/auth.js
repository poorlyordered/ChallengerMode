import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN_URL = 'https://publicapi.challengermode.com/mk1/oauth2/token';
let cachedToken = null;
let tokenExpiry = null;

export async function getAccessToken() {
  try {
    // Check if we have a valid cached token
    if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
      return { access_token: cachedToken };
    }

    if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.REFRESH_KEY) {
      throw new Error('Missing required environment variables for authentication');
    }

    // Request new token
    const response = await axios.post(TOKEN_URL, {
      grant_type: 'client_credentials',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      refresh_key: process.env.REFRESH_KEY
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.data?.access_token) {
      throw new Error('Invalid token response from server');
    }

    // Cache the token and set expiry (subtract 5 minutes for safety margin)
    cachedToken = response.data.access_token;
    tokenExpiry = Date.now() + ((response.data.expires_in - 300) * 1000);

    return {
      access_token: cachedToken,
      expires_in: response.data.expires_in
    };
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error || error.message;
    
    console.error('Authentication Error:', {
      status,
      message,
      details: error.response?.data
    });

    const enhancedError = new Error('Failed to obtain access token');
    enhancedError.status = status;
    enhancedError.details = message;
    throw enhancedError;
  }
}