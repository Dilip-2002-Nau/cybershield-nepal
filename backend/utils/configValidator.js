/**
 * Environment Configuration Validator
 * Validates all required environment variables at startup
 */

const REQUIRED_ENV_VARS = {
  PORT: { default: '5000', required: false },
  MONGODB_URI: { default: null, required: true },
  JWT_SECRET: { default: 'cybershield_secret_key_2024', required: true },
  JWT_EXPIRE: { default: '7d', required: false },
  NODE_ENV: { default: 'development', required: false },
  CLIENT_URL: { default: 'http://localhost:3000', required: false }
};

/**
 * Validates all environment variables
 * @returns {object} Validation result with status and errors
 */
const validateEnvironment = () => {
  const errors = [];
  const warnings = [];
  const config = {};

  console.log('\n🔍 Validating environment configuration...\n');

  for (const [key, settings] of Object.entries(REQUIRED_ENV_VARS)) {
    const value = process.env[key];

    // Check if required variable is missing
    if (settings.required && (!value || value.trim() === '')) {
      errors.push(`❌ ${key} is required but not set`);
    }

    // Use default value if available
    if (!value && settings.default) {
      process.env[key] = settings.default;
      warnings.push(`⚠️ ${key} not set. Using default: ${settings.default}`);
      config[key] = settings.default;
    } else if (value) {
      config[key] = value;
    }

    // Special validations
    if (key === 'PORT') {
      const port = parseInt(config[key]);
      if (isNaN(port) || port < 1 || port > 65535) {
        errors.push(`❌ PORT must be a valid number between 1 and 65535`);
      }
    }

    if (key === 'MONGODB_URI' && config[key]) {
      if (!config[key].includes('mongodb')) {
        errors.push(`❌ MONGODB_URI appears invalid (should contain 'mongodb')`);
      }
    }

    if (key === 'JWT_SECRET' && config[key] && config[key].length < 8) {
      errors.push(`❌ JWT_SECRET should be at least 8 characters long`);
    }

    if (key === 'CLIENT_URL' && config[key]) {
      try {
        new URL(config[key]);
      } catch {
        errors.push(`❌ CLIENT_URL is not a valid URL: ${config[key]}`);
      }
    }

    if (key === 'NODE_ENV' && !['development', 'production', 'test'].includes(config[key])) {
      warnings.push(`⚠️ NODE_ENV should be 'development', 'production', or 'test'`);
    }
  }

  // Print results
  if (warnings.length > 0) {
    console.log('📋 Warnings:');
    warnings.forEach(w => console.log(w));
    console.log();
  }

  if (errors.length > 0) {
    console.log('🚨 Configuration Errors:');
    errors.forEach(e => console.log(e));
    console.log();
    return { valid: false, errors, warnings, config };
  }

  console.log('✅ Environment configuration validated successfully!\n');
  console.log('📊 Active Configuration:');
  Object.entries(config).forEach(([key, value]) => {
    // Don't log sensitive values
    const displayValue = key.includes('SECRET') || key.includes('URI') ? '***' : value;
    console.log(`   ${key}: ${displayValue}`);
  });
  console.log();

  return { valid: true, errors, warnings, config };
};

/**
 * Initialize environment with validation
 * Should be called before setting up the server
 */
const initializeEnvironment = () => {
  const validation = validateEnvironment();

  if (!validation.valid) {
    console.error('\n❌ Failed to start server due to configuration errors\n');
    process.exit(1);
  }

  return validation.config;
};

module.exports = {
  validateEnvironment,
  initializeEnvironment,
  REQUIRED_ENV_VARS
};
