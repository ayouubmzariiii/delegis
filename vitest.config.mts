import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'server-only': path.resolve(__dirname, 'src/test/server-only.ts'),
    },
  },
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
    // DB tests run against an in-memory PGlite (real Postgres), never the local data folder.
    env: { DELEGIS_DB: 'memory' },
    testTimeout: 30_000,
  },
});
