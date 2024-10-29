export interface Space {
  id: string;
  name: string;
  description?: string;
  avatarUrl?: string | null;
  bannerUrl?: string | null;
  memberCount: number;
  visibility: 'public' | 'private' | string;
  createdAt: string;
  updatedAt: string;
  stats?: {
    totalTournaments?: number;
    activeTournaments?: number;
    totalMembers?: number;
  };
}

export interface ApiError {
  message: string;
  code?: string | number;
  status: number;
  details?: string;
}

export interface ApiResponse<T> {
  items: T[];
  total: number;
  error?: ApiError;
}