import { defineConfig } from 'vite';

const asd = defineConfig({
  server: {
    origin: '*',
    cors: false,

    headers: {
      'Cross-Origin-Embedder-Policy': 'unsafe-none',
      'Cross-Origin-Opener-Policy': 'unsafe-none',
    },
  },
});

export default asd;
