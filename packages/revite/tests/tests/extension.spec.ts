import { revite } from 'revite'
import { expect, describe, it } from 'vitest'
import { Test5ServiceContract } from '../mock/services/5/'

describe('Extension', async () => {
  it('extension: registerText', async () => {
    const config = import.meta.glob('../mock/config/mock-5/*.ts', { eager: true })

    await revite.bootstrap(config)

    const service = await revite.resolve(Test5ServiceContract)

    expect(service).toBeInstanceOf(Test5ServiceContract)

    expect(service.getText()).toBe('text test')
  })

  it('extension: error', async () => {
    const config = import.meta.glob('../mock/config/mock-5/error/*.ts', { eager: true })

    await revite.bootstrap(config)
    try {
      await revite.resolve(Test5ServiceContract)
      throw new Error('Function should have thrown an error')
    } catch (error) {
      expect(error.message).toBe('Invalid extension Test2Extension')
    }
  })
})