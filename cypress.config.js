const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    fixturesFolder: "cypress/fixtures",
    viewportHeight: 1080,
    viewportWidth: 1920
  },
  env: {
    loginBaseUrl: "https://bookcart.azurewebsites.net/api/login",
    registerBaseUrl: "https://bookcart.azurewebsites.net/api/user",
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD
  }
});
