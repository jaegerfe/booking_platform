import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    viewportWidth: 1000,
    viewportHeight: 800,
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
