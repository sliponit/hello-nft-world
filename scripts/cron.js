import fetch from 'node-fetch'

// TODO only_opensea
const OPENSEA_API_URL = 'https://rinkeby-api.opensea.io/api/v1/events?collection_slug=squarenft-3lpmi5miaz&only_opensea=false'
const WORKER_URL = 'https://nft-api.sliponit9471.workers.dev/events' // TODO 'http://127.0.0.1:8787/events'

const _lastId = {};

const clean = (event) => {
  const { id, event_type, created_date, listing_time, asset } = event;
  const { token_id } = asset || {}
  return { id, token_id, event_type, created_date, listing_time }
}

const fetchEvents = async ({ cursor, event_type }) => {
  let url = OPENSEA_API_URL;
  if (cursor) url += '&cursor=' + cursor;
  if (event_type) url += '&event_type=' + event_type;

  const headers = { "Accept": "application/json" };
  const response = await fetch(url, { headers });
  const { asset_events, previous, next } = await response.json();
  return { previous, next, asset_events: asset_events ? asset_events.map(clean) : [] };
}

async function fetchNewEvents ({ event_type }) {
  const data = await fetchEvents({ event_type });
  const events = data.asset_events;
  const goods = _lastId[event_type] ? events.filter(event => event.id > _lastId[event_type]) : events;
  if (goods.length) _lastId[event_type] = goods[0].id;

  return goods;
}

const HEADERS = {
  'Content-Type': 'application/json',
  // 'X-API-KEY': process.env.WORKER_API_KEY
}

async function postWorker(data) {
  await fetch(WORKER_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: HEADERS
  });
}

async function run () {
  // events
  const createds = await fetchNewEvents({ event_type: 'created' });
  await new Promise(resolve => setTimeout(resolve, 1000)); // TODO rate limit api
  const successfuls = await fetchNewEvents({ event_type: 'successful' });
  if (createds.length || successfuls.length) {
    console.log(_lastId, { createds, successfuls});
    await postWorker({ createds, successfuls });
  }  
}

run()