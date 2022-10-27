import { sveltekit } from "@sveltejs/kit/vite";
import { webSocketServer } from './socket.server.js'

const config = {
  plugins: [sveltekit(), webSocketServer],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/variables.scss" as *;',
      },
    },
  },
};

export default config;
