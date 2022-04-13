import { baseSvgs } from "./baseSvgs"

const signature = address => `<style>.base { fill: grey; font-family: serif; font-size: 6px; }</style>
<text x="70%" y="95%" class="base" dominant-baseline="middle" text-anchor="middle">${address}</text>`

export const nullSvg = (address) => {
  const svgStart =`<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 256 256"><rect width="100%" height="100%" fill="black" />`
  const svgEnd = `</svg>`
  return svgStart + signature(address) + svgEnd
}

const mintedSvg = (i, address, asleep) => {
  let base = baseSvgs[i].slice(0, baseSvgs[i].length - 6)
  if (asleep) base = base.replaceAll('white', 'lightgray')

  const svgEnd = `</svg>`
  return base + signature(address) + svgEnd
}

export default async (i) => {
  const values = await SCC.get('data', { type: 'json' })
  const { hibernateEnd, sleepEnd, minter } = values[i] // TODO
  const now = new Date().valueOf()
  if (hibernateEnd && now / 1000 < hibernateEnd) return nullSvg(minter)
  else if (sleepEnd && now / 1000 < sleepEnd) return mintedSvg(i, minter, true)
  else return mintedSvg(i, minter, false)
}
