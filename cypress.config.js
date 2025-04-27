const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "https://automationexercise.com",
    numTestsKeptInMemory: 0,
    video: false,
  },
});
