import { revite } from 'revite'
import { describe, it, expect } from 'vitest'

describe('Bootstrap Method Error', () => {

  it('should throw an error for missing "main" configuration', async () => {
    const config = {
      __name: 'example',
    }

    try {
      await revite.bootstrap(config)
      throw new Error('Function should have thrown an error')
    } catch (error) {
      expect(error.message).toBe('Configuration example does not contain the "main" file')
    }
  })

  it('no reactivity', async () => {
    const config = import.meta.glob('../mock/config/mock-3/*.ts', { eager: true })

    try {
      await revite.bootstrap(config)
      throw new Error('Function should have thrown an error')
    } catch (error) {
      console.log('error.message', error.message)
      expect(error.message).toBe('No reactivity service was bind')
    }
  })
})
