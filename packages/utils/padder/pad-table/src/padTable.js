import { Lange } from '@spare/lange'
import { Pad } from '@spare/pad-string'
import { maxBy as columnsMaxBy } from '@vect/columns-indicator'
import { mapper } from '@vect/vector-mapper'
import { Duozipper as MatDuoZip, Trizipper as MatTriZip } from '@vect/matrix-zipper'
import { Duozipper as VecDuoZip, Trizipper as VecTriZip } from '@vect/vector-zipper'
import { padTableFullAngle } from './padTableFullAngle'
import { DA } from '@spare/enum-chars'
// /**
//  *
//  *
//  * @param {string[][]} text
//  * @param {*[]} head
//  * @param {*[][]} raw
//  * @param {function[][]} [dye]
//  * @param {*[]} dyeHead
//  * @param {boolean=false} [ansi]
//  * @param {boolean=false} [fullAngle]
//  * @return {{head: string[], rows: string[][], hr: string[]}}
//  */
export const padTable = (
  text, head, {
    raw, dye, headDye, ansi = false, fullAngle = false
  } = {},
) => {
  if (fullAngle) return padTableFullAngle(text, head, { raw, dye, ansi })
  const padder = Pad({ ansi })
  const pads = columnsMaxBy([head].concat(text), Lange(ansi))
  return {
    head: headDye
      ? VecTriZip((x, d, p) => padder(x, p) |> d)(head, headDye, pads)
      : VecDuoZip((x, p) => padder(x, p))(head, pads),
    hr: mapper(pads, p => DA.repeat(p)),
    rows: dye
      ? MatTriZip((x, v, d, i, j) => padder(x, pads[j], v) |> d)(text, raw, dye)
      : MatDuoZip((x, v, i, j) => padder(x, pads[j], v))(text, raw)
  }
}
