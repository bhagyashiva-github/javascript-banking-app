// Utility function to log messages with a timestamp and log level
export const log = (msg, level = "info") => {
  // Generate the current timestamp in ISO 8601 format
  const timestamp = new Date().toISOString();

  // Use the specified logging level (e.g., "info", "warn", "error") to print the message
  // Output will be like: [2025-06-20T16:15:00.123Z] Your message here
  console[level](`[${timestamp}] ${msg}`);
};
