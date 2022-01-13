import { revite } from 'revite'

describe('revite/config', () => {
  test('Should format the date into the setted format', async () => {
    await revite.bootstrap(import.meta.globEager('../demo/config/glob/**/*.ts'))

    expect(3).toBe(3)
  })
})
