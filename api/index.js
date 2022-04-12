import { Router } from 'itty-router'
import fetchSvg, { nullSvg } from './src/fetchSvg'
import postEvents from './src/postEvents'

// Create a new router
const router = Router()

/*
Our index route, a simple hello world.
*/
router.get("/", () => {
  return new Response("Hello, world! This is the root page of your Worker template.")
})

/*
This route demonstrates path parameters, allowing you to extract fragments from the request
URL.

Try visit /example/hello and see the response.
*/
router.get("/example/:text", async({ params }) => {
  // Decode text like "Hello%20world" into "Hello world"
  const input = decodeURIComponent(params.text)
  const svg = nullSvg(input)
  const headers = { 'Content-Type': 'image/svg+xml' }
  return new Response(svg, { headers })
})

router.get("/svg/:id", async({ params }) => {
  // TODO: try/catch 
  const { id } = params
  if (0 <= id && id <= 40) {
    const headers = { 'Content-Type': 'image/svg+xml' }
    return new Response(await fetchSvg(id), { headers })
  } else {
    new Response("404, not found!", { status: 404 })
  }
})

router.get("/cid/:id", async({ params }) => {
  const { id } = params
  const data = await SCC.get('data', { type: 'json' })
  const { cid } = data[id]
  const headers = { "Content-Type": "application/json" }
  return new Response(JSON.stringify({ cid }), { headers })
})

/*
This shows a different HTTP method, a POST.

Try send a POST request using curl or another tool.

Try the below curl command to send JSON:

$ curl -X POST <worker> -H "Content-Type: application/json" -d '{"abc": "def"}'
*/
router.post("/events", async request => {
  // TODO if (request.headers.get('X-API-KEY') !== X_API_KEY) {
  //   return new Response('Forbidden', { status: 403 })
  // }

  // TODO if (request.headers.get("Content-Type") === "application/json") {

  const data = await request.json()
  await postEvents(data)
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-type': 'application/json'
    }
  })
})

/*
This is the last route we define, it will match anything that hasn't hit a route we've defined
above, therefore it's useful as a 404 (and avoids us hitting worker exceptions, so make sure to include it!).

Visit any page that doesn't exist (e.g. /foobar) to see it in action.
*/
router.all("*", () => new Response("404, not found!", { status: 404 }))

/*
This snippet ties our worker to the router we deifned above, all incoming requests
are passed to the router where your routes are called and the response is sent.
*/
addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request))
})
