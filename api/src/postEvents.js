export default async ({ createds, successfuls }) => {
  if (!createds || !successfuls || (!successfuls.length && !createds.length)) {
    throw new Error('InvalidEventType');
  }

  const data = await SCC.get('data', { type: 'json' })
  if (successfuls.length) {
    successfuls.forEach(({ token_id: i, listing_time }) => {
      const timestamp = Date.parse(listing_time) / 1000
      data[i].wakeUpTime = timestamp + (data[i].duration + 8) * 3600 // TODO 8
    })
  }

  if (createds.length) {
    createds.forEach(({ token_id: i, created_date }) => {
      const timestamp = Date.parse(created_date) / 1000
      const { wakeUpTime } = data[i]
      if (wakeUpTime && timestamp < wakeUpTime) data[i].hibernate = true // TODO time
    })
  }

  await SCC.put('data', JSON.stringify(data))
}
