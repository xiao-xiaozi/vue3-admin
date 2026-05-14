import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

// Mock dependencies before importing the store
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
    getDB: vi.fn().mockResolvedValue([]),
    setDB: vi.fn()
  })
}))

import { usePageStore } from '../page.js'

describe('pageStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
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
      expect(store.opened).toHaveLength(2) // HomeView + NormalPage
    })
  })

  describe('closePage', () => {
    it('应关闭指定页面', () => {
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
    it('应保留首页关闭其余所有', () => {
      const store = usePageStore()
      store.openPage({ name: 'PageA', path: '/a', fullPath: '/a', meta: { title: 'A' } })
      store.openPage({ name: 'PageB', path: '/b', fullPath: '/b', meta: { title: 'B' } })
      expect(store.opened).toHaveLength(3)

      store.closeAllPage()
      expect(store.opened).toHaveLength(1)
      expect(store.opened[0].name).toBe('HomeView')
    })
  })

  describe('closeLeftPage', () => {
    it('应关闭当前页左侧的所有页面', () => {
      const store = usePageStore()
      store.openPage({ name: 'PageA', path: '/a', fullPath: '/a', meta: { title: 'A' } })
      store.openPage({ name: 'PageB', path: '/b', fullPath: '/b', meta: { title: 'B' } })
      // opened: [HomeView, PageA, PageB]
      store.closeLeftPage({ pageSelect: 'PageB' })
      expect(store.opened).toHaveLength(2) // HomeView kept, PageB kept
      expect(store.opened[0].name).toBe('HomeView')
      expect(store.opened[1].name).toBe('PageB')
    })
  })

  describe('closeRightPage', () => {
    it('应关闭当前页右侧的所有页面', () => {
      const store = usePageStore()
      store.openPage({ name: 'PageA', path: '/a', fullPath: '/a', meta: { title: 'A' } })
      store.openPage({ name: 'PageB', path: '/b', fullPath: '/b', meta: { title: 'B' } })
      // opened: [HomeView, PageA, PageB]
      store.closeRightPage({ pageSelect: 'PageA' })
      // Should keep HomeView + PageA, remove PageB
      expect(store.opened.find(p => p.name === 'PageB')).toBeUndefined()
      expect(store.opened.find(p => p.name === 'HomeView')).toBeDefined()
    })
  })

  describe('closeOtherPage', () => {
    it('应保留当前页和首页关闭其余', () => {
      const store = usePageStore()
      store.openPage({ name: 'PageA', path: '/a', fullPath: '/a', meta: { title: 'A' } })
      store.openPage({ name: 'PageB', path: '/b', fullPath: '/b', meta: { title: 'B' } })
      // opened: [HomeView, PageA, PageB]
      store.closeOtherPage({ pageSelect: 'PageA' })
      expect(store.opened).toHaveLength(2)
      expect(store.opened[0].name).toBe('HomeView')
      expect(store.opened[1].name).toBe('PageA')
    })
  })
})
