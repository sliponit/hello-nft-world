import { Router } from 'itty-router'
import fetchSvg, { nullSvg } from './src/fetchSvg'
import postEvents from './src/postEvents'

// Create a new router
const router = Router()

const corsHeaders = {
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET,POST',
  'Access-Control-Allow-Origin': '*' // 'http://localhost/3000'
}

/*
Our index route, a simple hello world.
*/
router.get("/", () => {
  return new Response("Hello, world! This is the root page of your Worker template.")
})

router.get("/data", async () => {
  const data = await SCC.get('data', { type: 'json' })
  const tokens = data.filter(token => token.minter)
  const headers = { ...corsHeaders, 'Content-type': 'application/json' }
  return new Response(JSON.stringify({ tokens }), { headers })
})

router.get("/svg/:id", async({ params }) => {
  // TODO: try/catch 
  const { id } = params
  if (0 <= id && id < 40) {
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
  const headers = { ...corsHeaders, 'Content-type': 'application/json' }
  return new Response(JSON.stringify({ cid }), { headers })
})

// curl -X POST <worker> -H "Content-Type: application/json" -d '{"abc": "def"}'
router.post("/events", async request => {
  // TODO if (request.headers.get('X-API-KEY') !== X_API_KEY) {
  //   return new Response('Forbidden', { status: 403 })
  // }
  // if (request.headers.get("Content-Type") === "application/json") {
  const data = await request.json()
  await postEvents(data)
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-type': 'application/json'
    }
  })
})

router.options('/minter', () => new Response('OK', { headers: corsHeaders }))

router.post("/minter", async request => {
  // TODO if (request.headers.get('X-API-KEY') !== X_API_KEY) {
  //   return new Response('Forbidden', { status: 403 })
  // }
  // if (request.headers.get("Content-Type") === "application/json") {
  const { id, minter } = await request.json()
  const data = await SCC.get('data', { type: 'json' })
  if (data[id].minter) return new Response('Forbidden', { status: 403 })
  
  data[id].minter = minter
  await SCC.put('data', JSON.stringify(data))
  const headers = { ...corsHeaders, 'Content-type': 'application/json' }
  return new Response(JSON.stringify({ id, minter }), { headers })
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
