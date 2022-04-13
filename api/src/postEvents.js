export default async ({ createds, successfuls }) => {
  if (!createds || !successfuls || (!successfuls.length && !createds.length)) {
    throw new Error('InvalidEventType');
  }

  const data = await SCC.get('data', { type: 'json' })
  if (successfuls.length) {
    successfuls.forEach(({ token_id: i, listing_time }) => {
      const timestamp = Date.parse(listing_time) / 1000
      data[i].sleepEnd = timestamp + data[i].duration * 3600
    })
  }

  if (createds.length) {
    createds.forEach(({ token_id: i, created_date }) => {
      const timestamp = Date.parse(created_date) / 1000
      const { sleepEnd } = data[i]
      if (sleepEnd && timestamp < sleepEnd) data[i].hibernateEnd = timestamp + data[i].duration * 3600 * 24
    })
  }

  await SCC.put('data', JSON.stringify(data))
}
