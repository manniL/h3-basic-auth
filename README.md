# h3-basic-auth

> Basic Auth middleware for h3 / nitro / ... (based on [ezpass](https://github.com/unjs/ezpass))

## Usage

### With h3

```ts
import { createApp, defineEventHandler, toNodeListener } from 'h3'
import { listen } from 'listhen'
import { createBasicAuthMiddleware } from 'h3-basic-auth'

const app = createApp()

app.use(createBasicAuthMiddleware({
  sessionSecret: 'secret', // Set this to something useful
  username: 'test', // The valid username
  password: 'test' // The valid password
}))

app.use(defineEventHandler(event => `Welcome ${event.context.auth?.session.user}!`))

listen(toNodeListener(app))
```

### With Nitro

```ts
// server/middleware/basic-auth.ts
export default createBasicAuthMiddleware({
  sessionSecret: 'secret', // Set this to something useful
  username: 'test', // The valid username
  password: 'test' // The valid password
})
```

## Options

- `sessionSecret`
- `bypass`
- `onAuthorize`
- `username`
- `password`

```ts
app.use(createBasicAuthMiddleware({
  provider: 'basic',
  username: 'test',
  password: 'test'
}))
```

## Development

- Clone Repository
- Install dependencies with `yarn install`
- Use `yarn dev test/basic` to start basic example

## License

MIT
