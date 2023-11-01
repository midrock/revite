import { revite } from 'revite'
import { expect, describe, beforeEach, it } from 'vitest'
import { Test6ServiceContract } from '../mock/services/6/'

describe('Listeners and Event', async () => {
  beforeEach(async () => {
    const config = import.meta.glob('../mock/config/mock-6/*.ts', { eager: true })

    console.log(config)
    await revite.bootstrap(config)
  })

  it('resolve: event', async () => {
    const service = await revite.resolve(Test6ServiceContract)

    expect(service).toBeInstanceOf(Test6ServiceContract)

    service.clickEvent('Listeners and Event')

    console.log(service.getItems())
  })
})