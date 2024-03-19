import { createApp, defineEventHandler, toNodeListener } from 'h3'
import { listen } from 'listhen'
import { createBasicAuthMiddleware } from '../src'

const app = createApp()

app.use(createBasicAuthMiddleware({
  sessionSecret: 'secret',
  username: 'test',
  password: 'test'
}))

app.use(defineEventHandler(event => `Welcome ${event.context.auth?.session.user}!`))

listen(toNodeListener(app))
