const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  projectId: "",
  e2e: {
    setupNodeEvents(on, config) {
      const environmentName = config.env.environmentName || 'bookcart'
      const environmentFilename = `./${environmentName}.settings.json`
      const settings = require(environmentFilename)
      if (settings.baseUrl) {
        config.baseUrl = settings.baseUrl
      }
      if (settings.specPattern){
        config.specPattern = settings.specPattern
      }
      if (settings.env) {
        config.env = {
          ...config.env,
          ...settings.env,
        }
      }
      return config
    },
    fixturesFolder: "cypress/fixtures",
    viewportHeight: 1080,
    viewportWidth: 1920
  },
  env: {
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    USERID: process.env.USERID,
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: true,
    html: true,
    json: true,
  },
});
