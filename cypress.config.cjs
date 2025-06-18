const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://app.healthmaia.com',
    setupNodeEvents(on, config) {
      // configuração de eventos, se precisar
    },
  },

  reporter: 'junit',

  reporterOptions: {
    mochaFile: 'cypress/results/results-[hash].xml',  // Local onde os relatórios JUnit serão salvos
    toConsole: true,  // Opcional: mostra o resultado no console
  },
});
