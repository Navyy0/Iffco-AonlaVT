const { z } = require("zod");

/**
 * Common validation error messages
 */
const ERROR_MESSAGES = {
  REQUIRED: (field) => `${field} is required`,
  MIN_LENGTH: (field, length) => `${field} must be at least ${length} characters`,
  MAX_LENGTH: (field, length) => `${field} must not be more than ${length} characters`,
  INVALID_EMAIL: "Invalid email address",
  INVALID_YEAR: "Invalid year",
  PERCENTAGE_RANGE: "Percentage must be between 0 and 100",
};

/**
 * Common validation rules
 */
const commonValidators = {
  /**
   * Common string field validator with min and max length
   */
  stringField: (fieldName, { min = 1, max = 255 } = {}) =>
    z.string({ required_error: ERROR_MESSAGES.REQUIRED(fieldName) })
      .trim()
      .min(min, { message: ERROR_MESSAGES.MIN_LENGTH(fieldName, min) })
      .max(max, { message: ERROR_MESSAGES.MAX_LENGTH(fieldName, max) }),

  /**
   * Email validator
   */
  email: z.string({ required_error: ERROR_MESSAGES.REQUIRED("Email") })
    .trim()
    .email({ message: ERROR_MESSAGES.INVALID_EMAIL })
    .min(3, { message: ERROR_MESSAGES.MIN_LENGTH("Email", 3) })
    .max(255, { message: ERROR_MESSAGES.MAX_LENGTH("Email", 255) }),

  /**
   * Password validator
   */
  password: z.string({ required_error: ERROR_MESSAGES.REQUIRED("Password") })
    .min(7, { message: ERROR_MESSAGES.MIN_LENGTH("Password", 7) })
    .max(1024, { message: ERROR_MESSAGES.MAX_LENGTH("Password", 1024) }),
};

/**
 * Login schema validation
 */
const loginSchema = z.object({
  email: commonValidators.email,
  password: commonValidators.password,
});

/**
 * Signup/Registration schema validation
 * Extends login schema with additional user information
 */
const signupSchema = z.object({
  username: commonValidators.stringField("Name", { min: 3 }),
  email: commonValidators.email,
  phone: commonValidators.stringField("Phone", { min: 10, max: 20 }),
  password: commonValidators.password,
  // Educational Information
  college: commonValidators.stringField("College"),
  degree: commonValidators.stringField("Degree"),
  branch: commonValidators.stringField("Branch"),
  percentage: z.number({ required_error: ERROR_MESSAGES.REQUIRED("Percentage") })
    .min(0, { message: ERROR_MESSAGES.PERCENTAGE_RANGE })
    .max(100, { message: ERROR_MESSAGES.PERCENTAGE_RANGE }),
  yearOfCompletion: z.number({ required_error: ERROR_MESSAGES.REQUIRED("Year of completion") })
    .min(1900, { message: ERROR_MESSAGES.INVALID_YEAR }),
  // Location
  city: commonValidators.stringField("City"),
});

module.exports = {
  signupSchema,
  loginSchema,
  // Export validators for potential reuse in other schemas
  commonValidators,
};