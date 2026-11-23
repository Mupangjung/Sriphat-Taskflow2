import 'dotenv/config';
import { z } from 'zod';
export const config = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  HOST: z.string().default('127.0.0.1'),
  COOKIE_SECURE: z.enum(['true', 'false']).optional(),
  PORT: z.coerce.number().int().min(1).max(65535).default(3001),
  DATABASE_URL: z.string().startsWith('file:'),
  JWT_SECRET: z.string().min(32),
  APP_ORIGIN: z.string().url().default('http://localhost:3000'),
}).parse(process.env);
