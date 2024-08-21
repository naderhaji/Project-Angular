import { defineConfig } from 'cypress';

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    projectId: "7rqaju",
    baseUrl: 'https://gah-frontend.dev.abridia.com',
    viewportWidth: 1440,
    viewportHeight: 900,
    video: true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  
  
 
  
})

