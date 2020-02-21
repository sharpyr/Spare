import { FRESH, OCEAN } from '@palett/presets'
import { cosmati } from './cosmati'

/***
 *
 * @param {function(*):string} [keyAbstract]
 * @param {function(*):string} [abstract]
 * @param {{[max]:string|*[],[min]:string|*[],[na]:string|*[]}} [preset]
 * @param {{[max]:string|*[],[min]:string|*[],[na]:string|*[]}} [stringPreset]
 * @param {number} [head]
 * @param {number} [tail]
 * @param {string} [dash=' => ']
 * @param {string} [delimiter='\n']
 * @param {boolean} [ansi=false]
 * @returns {string}
 */
export const Deco = ({
  keyAbstract,
  abstract,
  preset = FRESH,
  stringPreset = OCEAN,
  head,
  tail,
  dash = ' > ',
  delimiter = ',\n',
  ansi = false
} = {}) => cosmati.bind({
  keyAbstract, abstract, preset, stringPreset, head, tail, dash, delimiter, ansi
})