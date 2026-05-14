import { describe, it, expect, beforeEach, vi } from 'vitest'

const cookieStore = {}

vi.mock('js-cookie', () => ({
  default: {
    set: vi.fn((key, value) => { cookieStore[key] = value }),
    get: vi.fn((key) => cookieStore[key]),
    remove: vi.fn((key) => { delete cookieStore[key] }),
    getJSON: vi.fn(),
    setJSON: vi.fn()
  }
}))

import util from '../util.cookie.js'

if (typeof globalThis.APP_VERSION === 'undefined') {
  globalThis.APP_VERSION = '0.0.0'
}

describe('util.cookie', () => {
  const COOKIE_NAME = `vue3-admin-${globalThis.APP_VERSION}-test-key`

  beforeEach(() => {
    Object.keys(cookieStore).forEach(k => delete cookieStore[k])
  })

  describe('set / get', () => {
    it('应该能设置并读取 cookie 值', () => {
      util.set('test-key', 'hello')
      expect(util.get('test-key')).toBe('hello')
    })

    it('应该返回默认值当 cookie 不存在时', () => {
      expect(util.get('nonexistent-key')).toBeUndefined()
    })

    it('应该覆盖同名 cookie', () => {
      util.set('test-key', 'first')
      util.set('test-key', 'second')
      expect(util.get('test-key')).toBe('second')
    })

    it('默认 cookie 设置应包含 SameSite=Strict', async () => {
      const Cookies = await import('js-cookie')
      util.set('test-key', 'secure-test')
      expect(Cookies.default.set).toHaveBeenCalledWith(
        COOKIE_NAME,
        'secure-test',
        expect.objectContaining({ sameSite: 'Strict' })
      )
    })

    it('自定义设置应覆盖默认值', async () => {
      const Cookies = await import('js-cookie')
      util.set('test-key', 'custom', { expires: 7 })
      expect(Cookies.default.set).toHaveBeenCalledWith(
        COOKIE_NAME,
        'custom',
        expect.objectContaining({ expires: 7, sameSite: 'Strict' })
      )
    })
  })

  describe('remove', () => {
    it('应该删除已有的 cookie', () => {
      util.set('test-key', 'to-delete')
      expect(util.get('test-key')).toBe('to-delete')
      util.remove('test-key')
      expect(util.get('test-key')).toBeUndefined()
    })

    it('删除不存在的 cookie 不应报错', () => {
      expect(() => util.remove('nonexistent')).not.toThrow()
    })
  })
})
