const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://app.healthmaia.com',
    setupNodeEvents(on, config) {
      // configuração de eventos, se precisar
    },
  },
});

