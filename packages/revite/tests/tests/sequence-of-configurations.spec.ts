import { revite } from 'revite'
import { expect, describe, beforeEach, it } from 'vitest'
import { Test7ServiceContract } from '../mock/services/7/'

describe('Sequence of Configurations', async () => {
  beforeEach(async () => {
    const config = import.meta.glob('../mock/config/mock-7/*.ts', { eager: true })

    console.log(config)
    await revite.bootstrap(config)
  })

  it('registration sequences in configurations', async () => {
    const service = await revite.resolve(Test7ServiceContract)

    expect(service).toBeInstanceOf(Test7ServiceContract)
    
    const sequences = [
      'preload 1',
      'preload 2',
      'providers 1',
      'providers 2',
      'package 1',
      'package 2',
      'authorized - preload 1',
      'authorized - preload 2',
      'authorized - providers 1',
      'authorized - providers 2',
      'authorized - package 1',
      'authorized - package 2',
      'unauthorized - preload 1',
      'unauthorized - preload 2',
      'unauthorized - providers 1',
      'unauthorized - providers 2',
      'unauthorized - package 1',
      'unauthorized - package 2',
    ]

    const data = service.getItems()

    expect(sequences).toEqual(data)

  })
})