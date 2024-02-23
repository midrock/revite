import { revite, resolveImport } from 'revite'
import { expect, describe, beforeEach, it } from 'vitest'
import { isReactive } from 'vue'
import { Test1ServiceContract } from '../mock/services/1/'
import { Test1Service } from '../mock/services/1/Test1Service'
import { Test2ServiceContract } from '../mock/services/2/'
import { Test3ServiceContract } from '../mock/services/3/'
import { Test4State } from '../mock/services/4'

describe('Resolve', async () => {
  beforeEach(async () => {
    const config = import.meta.glob('../mock/config/mock-1/*.ts', { eager: true })

    console.log(config)
    await revite.bootstrap(config)
  })

  it('resolve: should correctly bind the contract to the service', async () => {
    const service = await revite.resolve(Test1ServiceContract)

    expect(service).toBeInstanceOf(Test1ServiceContract)
  })

  it('resolve: should be a singleton', async () => {
    const service1 = await revite.resolve(Test1ServiceContract)
    const service2 = await revite.resolve(Test1ServiceContract)

    expect(service1).equal(service2)
  })

  it('resolve: should not be a singleton', async () => {
    const service1 = await revite.resolve(Test2ServiceContract)
    const service2 = await revite.resolve(Test2ServiceContract)

    expect(service1).not.equal(service2)
  })

  it('resolve: should be a deep reactive ', async () => {
    const service1 = await revite.resolve(Test1ServiceContract)

    expect(isReactive(service1)).toBe(true)
  })

  it('resolve: should be a reactive ', async () => {
    const service2 = await revite.resolve(Test2ServiceContract)

    expect(isReactive(service2)).toBe(true)
  })

  it('resolve: should not be a reactive', async () => {
    const service3 = await revite.resolve(Test3ServiceContract)

    expect(isReactive(service3)).not.toBe(true)
  })

  it('resolve: should be a factory', async () => {
    const service4 = await revite.resolve(Test4State)
    const service1 = await revite.resolve(Test1ServiceContract)
    
    expect(service1).equal(service4.options.test1Service)
  })

  it('resolveImport: should correctly bind the contract to the service', async () => {
    const serviceImport = await resolveImport(() => import('../mock/services/1/Test1Service'))

    expect(serviceImport).toBe(Test1Service)
  })

  it('resolveSync: should correctly bind the contract to the service', async () => {
    const service = revite.resolveSync(Test1ServiceContract)

    expect(service).toBeInstanceOf(Test1ServiceContract)
  })

  it('resolveIfExist: should correctly bind the contract to the service', async () => {
    const service = await revite.resolveIfExist(Test1ServiceContract)

    expect(service).toBeInstanceOf(Test1ServiceContract)
  })

  it('resolveIfExist: the contract should be linked to the service incorrectly', async () => {
    const serviceContract = 'mockContract'
    const service = await revite.resolveIfExist(serviceContract)

    expect(service).toBeUndefined()
  })

  it('resolveSyncIfExist: should correctly bind the contract to the service', async () => {
    const service = revite.resolveSyncIfExist(Test1ServiceContract)

    expect(service).toBeInstanceOf(Test1ServiceContract)
  })

  it('resolveSyncIfExist: the contract should be linked to the service incorrectly', async () => {
    const serviceContract = 'mockContract'
    const service = revite.resolveSyncIfExist(serviceContract)

    expect(service).toBeUndefined()
  })
})
