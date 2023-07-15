import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.number().default(3001),
  OPENAI_API_KEY: z.string().nonempty(),
  AUTH0_AUDIENCE: z.string().nonempty(),
  AUTH0_ISSUER_BASE_URL: z.string().nonempty(),
});

let env: z.infer<typeof envSchema>;
try {
  env = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    throw new Error(`Env validation error: ${error.message}`);
  }
  throw error;
}

export default env;
