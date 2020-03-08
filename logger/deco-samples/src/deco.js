import { FRESH, JUNGLE, SUBTLE } from '@palett/presets'
import { COLUMNWISE } from '@vect/matrix'
import { cosmati } from './cosmati'

/**
 *
 * @param {*[][]} matrix
 * @param {*[]} fields
 * @param {boolean} [indexed=true]
 * @param {number} [direct] - pointwise = 0, rowwise = 1, columnwise = 2
 * @param {function(*):string} [abstract]
 * @param {{max:string|*[],min:string|*[],na:string|*[]}} [preset]
 * @param {{max:string|*[],min:string|*[],na:string|*[]}} [keyPreset]
 * @param {{max:string|*[],min:string|*[],na:string|*[]}} [stringPreset]
 * @param {number} [top=0]
 * @param {number} [left=0]
 * @param {number} [bottom=0]
 * @param {number} [right=0]
 * @param {string} [delimiter=',']
 * @param {boolean} [ansi=false]
 * @returns {string}
 */
export const deco = (matrix, {
    fields,
    indexed = true,
    direct = COLUMNWISE,
    abstract,
    preset = FRESH,
    keyPreset = SUBTLE,
    stringPreset = JUNGLE,
    top = 0,
    left = 0,
    bottom = 0,
    right = 0,
    delimiter = ', ',
    ansi = false
  } = {}
) => cosmati.call({
    fields, indexed, direct, abstract, preset, keyPreset, stringPreset,
    top, left, bottom, right, delimiter, ansi
  },
  matrix)
