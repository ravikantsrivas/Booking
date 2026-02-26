import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = [
  "MONGO_URI",
  "JWT_RESET_PASSWORD_SECRET",
  "EMAIL_USER",
  "EMAIL_PASS",
  "EMAIL_HOST",
  "EMAIL_PORT",
  "PORT",
  "SALT_ROUNDS",
  "JWT_SECRET"
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`${envVar} is not set. Please define it in the environment.`);
  }
});

export const config = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS),
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  emailHost: process.env.EMAIL_HOST,
  emailPort: process.env.EMAIL_PORT,
};