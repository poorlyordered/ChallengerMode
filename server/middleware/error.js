export function errorHandler(err, req, res, next) {
  console.error('Server Error:', {
    message: err.message,
    path: req.path,
    status: err.status || 500
  });

  res.status(err.status || 500).json({
    error: {
      message: 'An unexpected error occurred',
      details: err.message
    }
  });
}