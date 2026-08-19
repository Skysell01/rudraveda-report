import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const envSchema = z.object({
  PORT: z.string().default('5000'),
  CORS_ORIGIN: z.string().default('*'),
  PROKERALA_CLIENT_ID: z.string().optional().default(''),
  PROKERALA_CLIENT_SECRET: z.string().optional().default(''),
  ANTHROPIC_API_KEY: z.string().optional().default(''),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development')
});

const parseResult = envSchema.safeParse(process.env);

if (!parseResult.success) {
  console.error('❌ Environment configuration validation errors:', parseResult.error.format());
}

export const env = parseResult.success ? parseResult.data : {
  PORT: process.env.PORT || '5000',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  PROKERALA_CLIENT_ID: process.env.PROKERALA_CLIENT_ID || '',
  PROKERALA_CLIENT_SECRET: process.env.PROKERALA_CLIENT_SECRET || '',
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || '',
  NODE_ENV: (process.env.NODE_ENV as any) || 'development'
};

export const isProkeralaConfigured = Boolean(env.PROKERALA_CLIENT_ID && env.PROKERALA_CLIENT_SECRET);
export const isClaudeConfigured = Boolean(env.ANTHROPIC_API_KEY);
