import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useMenuStore } from '../menu.js'

describe('menuStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('初始状态', () => {
    it('默认激活菜单应是首页', () => {
      const store = useMenuStore()
      expect(store.activeMenu).toBe('/index')
    })

    it('应包含默认首页菜单', () => {
      const store = useMenuStore()
      expect(store.menus).toHaveLength(1)
      expect(store.menus[0].path).toBe('/index')
      expect(store.menus[0].title).toBe('首页')
    })

    it('侧边栏默认应为展开状态', () => {
      const store = useMenuStore()
      expect(store.asideIsCollapse).toBe(false)
    })

    it('初始侧边菜单应为空（无子菜单）', () => {
      const store = useMenuStore()
      expect(store.asideMenu).toEqual([])
    })
  })

  describe('setCurrentMenu', () => {
    it('应更新当前激活菜单', () => {
      const store = useMenuStore()
      store.setCurrentMenu('/feature/editor')
      expect(store.activeMenu).toBe('/feature/editor')
    })
  })

  describe('changeAsideIsCollapse', () => {
    it('应切换侧边栏折叠状态', () => {
      const store = useMenuStore()
      expect(store.asideIsCollapse).toBe(false)
      store.changeAsideIsCollapse()
      expect(store.asideIsCollapse).toBe(true)
      store.changeAsideIsCollapse()
      expect(store.asideIsCollapse).toBe(false)
    })
  })

  describe('setMenus', () => {
    it('应合并固定菜单和新菜单', () => {
      const store = useMenuStore()
      store.setMenus([
        { path: '/user', title: '用户管理' },
        { path: '/system', title: '系统设置' }
      ])
      expect(store.menus).toHaveLength(3) // 首页 + 2
      expect(store.menus[0].path).toBe('/index') // 首页始终第一
      expect(store.menus[1].title).toBe('用户管理')
    })
  })

  describe('asideMenu (侧边菜单计算属性)', () => {
    it('应根据当前激活的头部菜单返回子菜单', () => {
      const store = useMenuStore()
      store.setCurrentMenu('/user/list')
      store.setMenus([
        {
          path: '/user',
          title: '用户管理',
          children: [
            { path: '/user/list', title: '用户列表' },
            { path: '/user/detail', title: '用户详情' }
          ]
        },
        {
          path: '/system',
          title: '系统设置',
          children: [
            { path: '/system/config', title: '系统配置' }
          ]
        }
      ])
      expect(store.asideMenu).toHaveLength(2)
      expect(store.asideMenu[0].title).toBe('用户列表')
    })

    it('当前菜单无子菜单时应返回空数组', () => {
      const store = useMenuStore()
      store.setCurrentMenu('/user/list')
      store.setMenus([
        {
          path: '/user',
          title: '用户管理',
          children: []
        }
      ])
      expect(store.asideMenu).toEqual([])
    })

    it('当前菜单无匹配时应返回空数组', () => {
      const store = useMenuStore()
      store.setCurrentMenu('/nonexistent/page')
      store.setMenus([
        { path: '/user', title: '用户管理' }
      ])
      expect(store.asideMenu).toEqual([])
    })
  })
})
