import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    testIsolation: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
