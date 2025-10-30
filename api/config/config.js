import "dotenv/config.js";

const getEnvVal = (key) => process.env[key];

const requiredENV = ["MONGO_URI", "JWT_EXPIRES_IN", "JWT_SECRET"];

export const config = {
  app: {
    port: getEnvVal("PORT") || 6000,
    env: getEnvVal("ENV") || "development",
  },
  db: {
    uri: getEnvVal("MONGO_URI"),
  },
  jwt: {
    secret: getEnvVal("JWT_SECRET"),
    expire: getEnvVal("JWT_EXPIRES_IN"),
  },
};

export const validateENV = () => {
  const missingENV = [];

  for (const key of requiredENV) {
    if (!getEnvVal(key)) missingENV.push(key);
  }

  if (missingENV.length > 0) {
    console.error(
      `❌ Missing required environment variables: ${missingENV.join(", ")}`
    );
    process.exit(1);
  }

  console.log("✅ All required environment variables are set.");
};
