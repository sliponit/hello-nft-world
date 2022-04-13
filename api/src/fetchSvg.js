

import { baseSvgs } from "./baseSvgs"

export const nullSvg = (input) => {
  const svgStart =`<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 256 256"><style>.base { fill: white; font-family: serif; font-size: 6px; }</style><rect width="100%" height="100%" fill="black" /><text x="70%" y="95%" class="base" dominant-baseline="middle" text-anchor="middle">`
  const svgEnd = `</text></svg>`
  return svgStart + input + svgEnd 
}

export default async (i) => {
  const values = await SCC.get('data', { type: 'json' })
  const { hibernateEnd } = values[i] 
  return hibernateEnd && new Date().valueOf() / 1000 < hibernateEnd ? nullSvg(i) : baseSvgs[i]
}
