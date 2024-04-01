# NTFY Workbench

## Example .env

```shell
# .env
NTFY_URL=https://ntfy.sh
NTFY_API_KEY=your-api-key
```

## Example config.json

```json
{
  "tags": ["tag1", "tag2"],
  "topics": [
    {
      "name": "test",
      "description": "test description",
      "tags": ["tag1"]
    },
    {
      "name": "test2",
      "description": "test description",
      "tags": ["tag1", "tag2"]
    }
  ]
}
```

# Welcome to Remix + Vite!

📖 See the [Remix docs](https://remix.run/docs) and the [Remix Vite docs](https://remix.run/docs/en/main/future/vite) for details on supported features.

## Development

Run the Vite dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`
