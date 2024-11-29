import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    'baseUrl': 'http://localhost:4200',
    'specPattern': 'projects/dev-app/cypress/e2e/**/*.cy.ts',
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    'specPattern': 'projects/nested-nav-list/cypress/component/**/*.cy.ts',
  },
});
