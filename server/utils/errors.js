export class AuthError extends Error {
  constructor(message, status = 500, details = null) {
    super(message);
    this.name = 'AuthError';
    this.status = status;
    this.details = details;
  }
}

export class ApiError extends Error {
  constructor(message, status = 500, details = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}