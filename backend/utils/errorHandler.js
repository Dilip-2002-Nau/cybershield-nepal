/**
 * Error Handler Utility
 * Centralized error handling and logging system
 */

class ErrorHandler extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
  }

  toJSON() {
    return {
      success: false,
      statusCode: this.statusCode,
      message: this.message,
      timestamp: this.timestamp
    };
  }
}

/**
 * Async wrapper to catch errors in route handlers
 * Prevents "unhandled promise rejection" errors
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Validation error handler
 */
const validationError = (message, field = null) => {
  const error = new ErrorHandler(message, 400);
  if (field) error.field = field;
  return error;
};

/**
 * Authentication error handler
 */
const authError = (message = 'Authentication failed') => {
  return new ErrorHandler(message, 401);
};

/**
 * Authorization error handler
 */
const authorizationError = (message = 'Access denied') => {
  return new ErrorHandler(message, 403);
};

/**
 * Not found error handler
 */
const notFoundError = (resource = 'Resource') => {
  return new ErrorHandler(`${resource} not found`, 404);
};

/**
 * Conflict error handler (e.g., duplicate email)
 */
const conflictError = (message = 'Resource already exists') => {
  return new ErrorHandler(message, 409);
};

/**
 * Server error handler
 */
const serverError = (message = 'Internal server error', originalError = null) => {
  const error = new ErrorHandler(message, 500);
  if (originalError) {
    error.originalError = originalError.message;
    console.error('❌ Server Error Details:', originalError.stack);
  }
  return error;
};

/**
 * Log errors with context
 */
const logError = (error, context = '') => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    context,
    message: error.message,
    statusCode: error.statusCode || 500,
    stack: error.stack
  };
  
  console.error('🔴 [ERROR]', JSON.stringify(logEntry, null, 2));
  return logEntry;
};

/**
 * Format error response
 */
const formatErrorResponse = (error) => {
  return {
    success: false,
    message: error.message || 'An error occurred',
    statusCode: error.statusCode || 500,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  };
};

module.exports = {
  ErrorHandler,
  asyncHandler,
  validationError,
  authError,
  authorizationError,
  notFoundError,
  conflictError,
  serverError,
  logError,
  formatErrorResponse
};
