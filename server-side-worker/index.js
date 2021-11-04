import { Router } from 'itty-router'

const router = Router()

router.get('/posts', async () => {
  const { keys } = await myfirstcf.list()
  const posts = await Promise.all(
    keys.map(key => myfirstcf.get(key.name, { type: 'json' })),
  )

  return new Response(JSON.stringify(posts), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
})

router.post('/posts', async request => {
  const fields = await request.json()
  const key = `post:${Date.now()}`
  await myfirstcf.put(key, JSON.stringify(fields))
  const post = await myfirstcf.get(key)

  return new Response(post, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '/',
    },
  })
})

// FIXME:
router.all('*', () => new Response('404, not found!!', { status: 404 }))

addEventListener('fetch', e => {
  e.respondWith(router.handle(e.request))
})
