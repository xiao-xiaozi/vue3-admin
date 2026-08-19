/**
 * @vitest-environment jsdom
 */
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { api } from '@/api'
import util from '@/utils'
import { MOCK_ACCESS_TOKEN } from '@/mocks/handlers'
import { mockServer } from '@/mocks/node'

describe('mock API', () => {
  beforeAll(() => {
    vi.stubGlobal('APP_VERSION', '0.0.0')
    mockServer.listen({ onUnhandledRequest: 'error' })
  })

  beforeEach(() => {
    util.cookie.remove('token')
    window.location.hash = ''
  })

  afterEach(() => {
    mockServer.resetHandlers()
  })

  afterAll(() => {
    mockServer.close()
    vi.unstubAllGlobals()
  })

  it('登录成功后返回访问令牌', async () => {
    const response = await api.loginPost({
      data: {
        username: 'admin',
        password: 'admin'
      }
    })

    expect(response.data.token).toBe(MOCK_ACCESS_TOKEN)
  })

  it('缺少登录信息时返回 400', async () => {
    await expect(api.loginPost({ data: {}})).rejects.toMatchObject({ response: { status: 400 }})
  })

  it('携带令牌时返回权限路由和用户信息', async () => {
    util.cookie.set('token', MOCK_ACCESS_TOKEN)

    const response = await api.userResourceGet()

    expect(response.data.permissionRoutes).toHaveLength(3)
    expect(response.data.permissionCode).toContain('add')
    expect(response.data.userInfo).toMatchObject({
      uuid: 'mock-admin-001',
      name: 'admin'
    })
  })

  it('未携带令牌时返回 401 并跳转登录页', async () => {
    await expect(api.userResourceGet()).rejects.toMatchObject({ response: { status: 401 }})

    expect(window.location.hash).toBe('#/login')
  })
})
