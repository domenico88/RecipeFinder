import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/vitest.setup.ts',
    include: ['src/tests/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    testTimeout: 5000,
  },
});