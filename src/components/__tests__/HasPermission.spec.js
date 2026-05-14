/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import HasPermission from '../HasPermission.vue'

vi.mock('@/stores/user', () => ({
  useUserStore: () => ({
    permissionCode: ['user:read', 'user:write', 'admin:delete']
  })
}))

describe('HasPermission', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('用户有权限时应渲染插槽内容', () => {
    const wrapper = mount(HasPermission, {
      props: { code: 'user:read' },
      slots: { default: '<span class="protected">受保护内容</span>' }
    })
    expect(wrapper.find('.protected').exists()).toBe(true)
    expect(wrapper.text()).toBe('受保护内容')
  })

  it('用户无权限时应隐藏内容', () => {
    const wrapper = mount(HasPermission, {
      props: { code: 'super:access' },
      slots: { default: '<span class="protected">受保护内容</span>' }
    })
    expect(wrapper.find('.protected').exists()).toBe(false)
  })

  it('应支持多个权限码中的任意一个', () => {
    const wrapper = mount(HasPermission, {
      props: { code: 'admin:delete' },
      slots: { default: '<span>管理员可见</span>' }
    })
    expect(wrapper.text()).toBe('管理员可见')
  })
})
