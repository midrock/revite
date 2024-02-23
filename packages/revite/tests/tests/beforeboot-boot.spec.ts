import { revite } from 'revite'
import { expect, describe, beforeEach, it } from 'vitest'
import { Test1ServiceContract } from '../mock/services/1/'

describe('beforeBoot and Boot', async () => {
  beforeEach(async () => {
    const config = import.meta.glob('../mock/config/mock-1/*.ts', { eager: true })

    console.log(config)
    await revite.bootstrap(config)
  })

  it('resolve: checking execution order beforeBoot and boot', async () => {
    const service = await revite.resolve(Test1ServiceContract)

    expect(service).toBeInstanceOf(Test1ServiceContract)
    
    const data = service.getItems()

    expect(data[0]).toBe('beforeBoot')
    expect(data[1]).toBe('boot')
  })
})