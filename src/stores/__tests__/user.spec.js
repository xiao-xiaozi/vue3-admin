import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useUserStore } from '../user.js'

describe('userStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('初始状态', () => {
    it('应该有空权限码', () => {
      const store = useUserStore()
      expect(store.permissionCode).toEqual([])
    })

    it('hasPermissionInfo 应为 false', () => {
      const store = useUserStore()
      expect(store.hasPermissionInfo).toBe(false)
    })

    it('应有默认用户信息', () => {
      const store = useUserStore()
      expect(store.userInfo.name).toBe('admin')
    })
  })

  describe('setHasPermissionInfo', () => {
    it('应更新权限信息状态', () => {
      const store = useUserStore()
      store.setHasPermissionInfo(true)
      expect(store.hasPermissionInfo).toBe(true)
    })
  })

  describe('setPermissionCode', () => {
    it('应设置权限码数组', () => {
      const store = useUserStore()
      store.setPermissionCode(['user:read', 'user:write'])
      expect(store.permissionCode).toEqual(['user:read', 'user:write'])
    })

    it('非数组参数不应更新权限码', () => {
      const store = useUserStore()
      store.setPermissionCode('not-an-array')
      expect(store.permissionCode).toEqual([])
    })
  })

  describe('setUserInfo', () => {
    it('应合并用户信息', () => {
      const store = useUserStore()
      store.setUserInfo({ name: 'test-user', uuid: '123' })
      expect(store.userInfo.name).toBe('test-user')
      expect(store.userInfo.uuid).toBe('123')
    })
  })

  describe('resetAllState', () => {
    it('应清空所有用户状态', () => {
      const store = useUserStore()
      store.setHasPermissionInfo(true)
      store.setPermissionCode(['user:read'])
      store.setUserInfo({ name: 'test', uuid: '456' })

      store.resetAllState()

      expect(store.hasPermissionInfo).toBe(false)
      expect(store.permissionCode).toEqual([])
      // userInfo 使用 reactive，resetAllState 会清空其属性
      expect(store.userInfo.name).toBeUndefined()
      expect(store.userInfo.uuid).toBeUndefined()
    })
  })
})
