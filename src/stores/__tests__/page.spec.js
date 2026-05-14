import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

const mockSetDB = vi.fn()
const mockGetDB = vi.fn().mockResolvedValue([])

vi.mock('@/router/index', () => ({
  default: {
    push: vi.fn(),
    afterEach: vi.fn(),
    beforeEach: vi.fn(),
    addRoute: vi.fn()
  }
}))

vi.mock('@/stores/lowdb', () => ({
  useLowdbStore: () => ({
    getDB: mockGetDB,
    setDB: mockSetDB
  })
}))

import { usePageStore } from '../page.js'

describe('pageStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    mockGetDB.mockResolvedValue([])
  })

  describe('初始状态', () => {
    it('首页应在 opened 中', () => {
      const store = usePageStore()
      expect(store.opened).toHaveLength(1)
      expect(store.opened[0].name).toBe('HomeView')
    })

    it('当前页面应为首页', () => {
      const store = usePageStore()
      expect(store.currentPageName).toBe('HomeView')
    })

    it('keepAliveRouteName 应为空', () => {
      const store = usePageStore()
      expect(store.keepAliveRouteName.size).toBe(0)
    })

    it('tabPages 应为空数组', () => {
      const store = usePageStore()
      expect(store.tabPages).toEqual([])
    })
  })

  describe('openPage', () => {
    it('应添加新页面到 opened', () => {
      const store = usePageStore()
      store.openPage({
        name: 'NormalPage',
        path: '/test/normal',
        fullPath: '/test/normal',
        meta: { title: '测试页' }
      })
      expect(store.opened).toHaveLength(2)
      expect(store.opened[1].name).toBe('NormalPage')
    })

    it('不应添加隐藏页面', () => {
      const store = usePageStore()
      store.openPage({
        name: 'HiddenPage',
        path: '/test/hidden',
        fullPath: '/test/hidden',
        meta: { title: '隐藏页', hidden: true }
      })
      expect(store.opened).toHaveLength(1)
    })

    it('应更新当前页面名称', () => {
      const store = usePageStore()
      store.openPage({
        name: 'NormalPage',
        path: '/test/normal',
        fullPath: '/test/normal',
        meta: { title: '测试页' }
      })
      expect(store.currentPageName).toBe('NormalPage')
    })

    it('重复打开已存在的页面不应重复添加', () => {
      const store = usePageStore()
      store.openPage({
        name: 'NormalPage',
        path: '/test/normal',
        fullPath: '/test/normal',
        meta: { title: '测试页' }
      })
      store.openPage({
        name: 'NormalPage',
        path: '/test/normal',
        fullPath: '/test/normal?tab=1',
        meta: { title: '测试页' }
      })
      expect(store.opened).toHaveLength(2)
    })
  })

  describe('closePage', () => {
    it('应关闭指定页面并持久化', () => {
      const store = usePageStore()
      store.openPage({
        name: 'NormalPage',
        path: '/test/normal',
        fullPath: '/test/normal',
        meta: { title: '测试页' }
      })
      store.closePage({ name: 'NormalPage' })
      expect(store.opened).toHaveLength(1)
      expect(store.opened[0].name).toBe('HomeView')
      expect(mockSetDB).toHaveBeenCalled()
    })
  })

  describe('updateCurrentPageName', () => {
    it('应更新当前页面名称', () => {
      const store = usePageStore()
      store.updateCurrentPageName('NormalPage')
      expect(store.currentPageName).toBe('NormalPage')
    })
  })

  describe('findKeepAliveRoute', () => {
    it('应收集开启缓存的页面', () => {
      const store = usePageStore()
      store.findKeepAliveRoute([
        { name: 'CachedPage', meta: { cache: true } }
      ])
      expect(store.keepAliveRouteName.has('CachedPage')).toBe(true)
    })

    it('不应收集未开启缓存的页面', () => {
      const store = usePageStore()
      store.findKeepAliveRoute([
        { name: 'NoCachePage', meta: { cache: false } }
      ])
      expect(store.keepAliveRouteName.has('NoCachePage')).toBe(false)
    })

    it('应递归处理嵌套路由', () => {
      const store = usePageStore()
      store.findKeepAliveRoute([
        {
          children: [
            { name: 'NestedCached', meta: { cache: true } }
          ]
        }
      ])
      expect(store.keepAliveRouteName.has('NestedCached')).toBe(true)
    })

    it('非数组参数应抛出错误', () => {
      const store = usePageStore()
      expect(() => store.findKeepAliveRoute('not-an-array')).toThrow('routes must be Array!')
    })
  })

  describe('findAllInTabPage', () => {
    it('应收集所有可标签页化的路由', () => {
      const store = usePageStore()
      store.findAllInTabPage([
        {
          name: 'Parent',
          children: [
            { name: 'Child1', path: '/child1', meta: { title: '子页1' } },
            { name: 'Child2', path: '/child2', meta: { title: '子页2' } }
          ]
        }
      ])
      expect(store.tabPages).toHaveLength(2)
      expect(store.tabPages[0].name).toBe('Child1')
    })

    it('应过滤隐藏页面', () => {
      const store = usePageStore()
      store.findAllInTabPage([
        { name: 'Visible', path: '/visible', meta: { title: '可见' } },
        { name: 'Hidden', path: '/hidden', meta: { title: '隐藏', hidden: true } }
      ])
      expect(store.tabPages).toHaveLength(1)
      expect(store.tabPages[0].name).toBe('Visible')
    })
  })

  describe('closeAllPage', () => {
    it('应保留首页关闭其余所有并持久化', () => {
      const store = usePageStore()
      store.openPage({ name: 'PageA', path: '/a', fullPath: '/a', meta: { title: 'A' } })
      store.openPage({ name: 'PageB', path: '/b', fullPath: '/b', meta: { title: 'B' } })
      expect(store.opened).toHaveLength(3)
      store.closeAllPage()
      expect(store.opened).toHaveLength(1)
      expect(store.opened[0].name).toBe('HomeView')
      expect(mockSetDB).toHaveBeenCalled()
    })
  })

  describe('closeLeftPage', () => {
    it('应关闭当前页左侧的所有页面', () => {
      const store = usePageStore()
      store.openPage({ name: 'PageA', path: '/a', fullPath: '/a', meta: { title: 'A' } })
      store.openPage({ name: 'PageB', path: '/b', fullPath: '/b', meta: { title: 'B' } })
      store.closeLeftPage({ pageSelect: 'PageB' })
      expect(store.opened).toHaveLength(2)
      expect(store.opened[0].name).toBe('HomeView')
      expect(store.opened[1].name).toBe('PageB')
    })
  })

  describe('closeRightPage', () => {
    it('应关闭当前页右侧的所有页面', () => {
      const store = usePageStore()
      store.openPage({ name: 'PageA', path: '/a', fullPath: '/a', meta: { title: 'A' } })
      store.openPage({ name: 'PageB', path: '/b', fullPath: '/b', meta: { title: 'B' } })
      store.closeRightPage({ pageSelect: 'PageA' })
      expect(store.opened.find(p => p.name === 'PageB')).toBeUndefined()
      expect(store.opened.find(p => p.name === 'HomeView')).toBeDefined()
    })
  })

  describe('closeOtherPage', () => {
    it('应保留当前页和首页关闭其余', () => {
      const store = usePageStore()
      store.openPage({ name: 'PageA', path: '/a', fullPath: '/a', meta: { title: 'A' } })
      store.openPage({ name: 'PageB', path: '/b', fullPath: '/b', meta: { title: 'B' } })
      store.closeOtherPage({ pageSelect: 'PageA' })
      expect(store.opened).toHaveLength(2)
      expect(store.opened[0].name).toBe('HomeView')
      expect(store.opened[1].name).toBe('PageA')
    })
  })

  describe('opened2db', () => {
    it('打开页面后应调用持久化', () => {
      const store = usePageStore()
      store.openPage({ name: 'TestPage', path: '/test', fullPath: '/test', meta: { title: '测试' } })
      expect(mockSetDB).toHaveBeenCalledWith(
        expect.objectContaining({
          dbName: 'sys',
          path: 'page.opened',
          user: true
        })
      )
    })
  })

  describe('openedLoad (从持久化恢复标签页)', () => {
    it('应静默处理空的持久化数据', async () => {
      mockGetDB.mockResolvedValue([])
      const store = usePageStore()
      await store.openedLoad()
      // 空持久化数据时 opened 被清空
      expect(store.opened).toHaveLength(0)
    })

    it('应恢复首页类型的持久化数据', async () => {
      mockGetDB.mockResolvedValue([
        { name: 'HomeView', path: '/index', fullPath: '/index', meta: { title: '首页' } }
      ])
      const store = usePageStore()
      await store.openedLoad()
      expect(store.opened).toHaveLength(1)
    })

    it('应过滤掉已失效的标签页', async () => {
      // 持久化中有 NormalPage，但 tabPages 中不存在（失效了）
      mockGetDB.mockResolvedValue([
        { name: 'StalePage', path: '/stale', fullPath: '/stale', meta: { title: '失效页' } }
      ])
      const store = usePageStore()
      await store.openedLoad()
      // StalePage 不在 tabPages 中，应被过滤
      expect(store.opened.find(p => p.name === 'StalePage')).toBeUndefined()
    })

    it('应合并持久化数据和最新页面定义', async () => {
      const store = usePageStore()
      // 先在 tabPages 中注册一个页面
      store.findAllInTabPage([
        { name: 'ValidPage', path: '/valid', meta: { title: '最新标题' } }
      ])
      mockGetDB.mockResolvedValue([
        {
          name: 'ValidPage',
          path: '/valid',
          fullPath: '/valid?old=param',
          meta: { title: '旧标题' },
          query: { old: 'param' }
        }
      ])
      await store.openedLoad()
      const restored = store.opened.find(p => p.name === 'ValidPage')
      expect(restored).toBeDefined()
      // meta.title 应该用最新的（来自 find）
      expect(restored.meta.title).toBe('最新标题')
      // query 应该保留旧的（来自持久化）
      expect(restored.query).toEqual({ old: 'param' })
    })

  })
})
