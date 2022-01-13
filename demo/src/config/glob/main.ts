import { defineConfig } from 'revite'
import { AuthServiceProvider } from '/~/services/auth/AuthServiceProvider'

export default defineConfig({
  logger: {
    level: 'debug',
  },
  reactivity: {
    // service:
  },
  providers: [
    AuthServiceProvider,
  ],
})
