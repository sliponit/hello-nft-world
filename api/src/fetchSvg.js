import { baseSvgs } from "./baseSvgs"

const signature = address => `<style>.base { fill: grey; font-family: serif; font-size: 6px; }</style>
<text x="70%" y="95%" class="base" dominant-baseline="middle" text-anchor="middle">${address}</text>`

export const nullSvg = (address) => {
  const svgStart =`<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 256 256"><rect width="100%" height="100%" fill="black" />`
  const svgEnd = `</svg>`
  return svgStart + signature(address) + svgEnd 
}

const mintedSvg = (i, address) => {
  const base = baseSvgs[i]
  const svgEnd = `</svg>`
  return base.slice(0, base.length - 6) + signature(address) + svgEnd 
}

export default async (i) => {
  const values = await SCC.get('data', { type: 'json' })
  const { hibernateEnd, sleepEnd, minter } = values[i] // TODO
  return hibernateEnd && new Date().valueOf() / 1000 < hibernateEnd ? nullSvg(minter) : mintedSvg(i, minter)
}
