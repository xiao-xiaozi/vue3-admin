import { delay, http, HttpResponse } from 'msw'
import userResource from './data/userResource'

export const MOCK_ACCESS_TOKEN = 'mock-access-token'

export const handlers = [
  http.post('*/api/login', async ({ request }) => {
    const credentials = await request.json().catch(() => ({}))

    if (!credentials.username || !credentials.password) {
      return HttpResponse.json({ message: '用户名和密码不能为空' }, { status: 400 })
    }

    await delay(150)

    return HttpResponse.json({ data: { token: MOCK_ACCESS_TOKEN }})
  }),

  http.get('*/api/userResource', async ({ request }) => {
    if (request.headers.get('Authorization') !== `Bearer ${MOCK_ACCESS_TOKEN}`) {
      return HttpResponse.json({ message: '登录状态已失效' }, { status: 401 })
    }

    await delay(100)

    return HttpResponse.json({ data: userResource })
  })
]
