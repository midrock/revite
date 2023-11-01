import { revite } from 'revite'
import { describe, it, expect } from 'vitest'

describe('Next Method Error', () => {
  it('should throw an error for an unknown session', async () => {
    const config = import.meta.glob('../mock/config/mock-2/*.ts', { eager: true })

    await revite.bootstrap(config)

    const sessionName = 'nonExistentSession'
 
    try {
      await revite.next(sessionName)
      throw new Error('Function should have thrown an error')
    } catch (error) {
      expect(error.message).toContain(`Session ${sessionName} was not found`)
    }
  })
})
