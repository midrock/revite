import { revite } from 'revite'
import { expect, describe, it, beforeAll } from 'vitest'

describe('Resolve mock-1', async () => {
  beforeAll(async () => {
    const config = import.meta.glob('../mock/config/mock-1/*.ts', { eager: true })

    console.log(config)
    await revite.bootstrap(config)
  })

  it('resolve: should throw an error if no service is bound for the contract', async () => {
    abstract class YourServiceContract {
      abstract yourMethod(): void
      abstract yourProperty: string
    }

    try {
      await revite.resolve(YourServiceContract)
      throw new Error('Function should have thrown an error')
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toMatch(`No service was bind for ${YourServiceContract.name}`)
    }
  })

  it('resolveSync: should throw an error if no service is bound for the contract', async () => {
    abstract class YourServiceContract {
      abstract yourMethod(): void
      abstract yourProperty: string
    }

    try {
      revite.resolveSync(YourServiceContract)
      throw new Error('Function should have thrown an error')
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toMatch(`No service for ${YourServiceContract.name}`)
    }
  })
})