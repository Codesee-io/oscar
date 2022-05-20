const requiredEnvVars = [
  "DISCORD_BOT_TOKEN",
  "DISCORD_CLIENT_ID",
  "DISCORD_GUILD_ID",
  "FIREBASE_SERVICE_ACCOUNT_KEY",
  "MAINTAINER_ENDPOINT_URL",
  "OSCAR_API_KEY",
];

/**
 * Verify that the required environment variables are present.
 */
export function verifyEnvironmentVariables() {
  const missingEnvVars = requiredEnvVars.filter(
    (variable) =>
      typeof process.env[variable] !== "string" ||
      process.env[variable].length === 0
  );

  if (missingEnvVars.length > 0) {
    console.log(
      `OSCAR cannot start without the following environment variables:${missingEnvVars
        .map((e) => "\n - " + e)
        .join("")}`
    );
    process.exit(1);
  }
}
