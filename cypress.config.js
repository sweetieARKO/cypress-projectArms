const { defineConfig } = require("cypress");
// cypress.config.js
module.exports = {
  e2e: {
    baseUrl: 'https://www.saucedemo.com/',
      pageLoadTimeout: 120000, // Increase timeout to 120 seconds
  },
};

