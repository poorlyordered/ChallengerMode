export function validateEnvVariables() {
  const required = ['CLIENT_ID', 'CLIENT_SECRET', 'REFRESH_KEY'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}