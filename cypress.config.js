const { defineConfig } = require("cypress");
// cypress.config.js
module.exports = {
  e2e: {
    baseUrl: 'https://www.saucedemo.com/',
    // pageLoadTimeout: 1200, // Increase timeout to 120 seconds
  },
};

