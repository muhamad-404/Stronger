import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Relative base so assets resolve under:
 * https://USERNAME.github.io/REPOSITORY/
 * Combined with HashRouter, refreshes never hit GitHub Pages 404s.
 */
export default defineConfig({
  plugins: [react()],
  base: './',
});
