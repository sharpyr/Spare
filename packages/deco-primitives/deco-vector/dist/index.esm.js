import { presetVector } from '@spare/preset-deco';
import { fluoVector } from '@palett/fluo-vector';
import { _decoEntries } from '@spare/deco-entries';
import { liner } from '@spare/liner';
import { vectorMargin } from '@spare/vector-margin';
import { MUTATE_PIGMENT } from '@palett/enum-colorant-modes';

const fluo = fluoVector.bind(MUTATE_PIGMENT);
function _decoVector(vec = []) {
  const config = this;
  if (config !== null && config !== void 0 && config.indexed) return _decoEntries.call(config, Object.entries(vec));
  vec = vectorMargin(vec, config); // use: head, tail, read, rule

  if (config.presets) vec = fluo(vec, config.presets); // use:  presets, effects

  return liner(vec, config);
}

/**
 * @typedef {{[max]:string|*[],[min]:string|*[],[na]:string|*[]}} Preset
 */

/***
 *
 * @param {Object} p
 *
 * @param {boolean} [p.discrete]
 * @param {string} [p.dash=') ']
 * @param {string} [p.delim=',\n']
 *
 * @param {boolean|number} [p.bracket=true] - BRK = 1
 *
 * @param {boolean} [p.indexed=true]
 * @param {Function} [p.read]
 *
 * @param {Object|Object[]} [p.presets=[FRESH,JUNGLE]]
 *
 * @param {number} [p.head]
 * @param {number} [p.tail]
 *
 * @param {boolean} [p.ansi]
 * @param {number} [p.level=0]
 *
 * @returns {Function}
 */

const Deco = (p = {}) => _decoVector.bind(presetVector(p));
/***
 *
 * @param {*[]} vector
 * @param {Object} p
 *
 * @param {boolean} [p.discrete]
 * @param {string} [p.dash=') ']
 * @param {string} [p.delim=',\n']
 *
 * @param {boolean|number} [p.bracket=true] - BRK = 1
 *
 * @param {boolean} [p.indexed=true]
 * @param {Function} [p.read]
 *
 * @param {Object|Object[]} [p.presets=[FRESH,JUNGLE]]
 *
 * @param {number} [p.head]
 * @param {number} [p.tail]
 *
 * @param {boolean} [p.ansi]
 * @param {number} [p.level=0]
 *
 * @returns {string}
 */

const deco = (vector, p = {}) => _decoVector.call(presetVector(p), vector);
/***
 *
 * @param {Object} p
 *
 * @param {boolean} [p.discrete]
 * @param {string} [p.dash=') ']
 * @param {string} [p.delim=',\n']
 *
 * @param {boolean|number} [p.bracket=true] - BRK = 1
 *
 * @param {boolean} [p.indexed=true]
 * @param {Function} [p.read]
 *
 * @param {Object|Object[]} [p.presets=[FRESH, JUNGLE]]
 *
 * @param {number} [p.head]
 * @param {number} [p.tail]
 *
 * @param {boolean} [p.ansi]
 * @param {number} [p.level=0]
 *
 * @returns {Function}
 */

const DecoPale = (p = {}) => _decoVector.bind(presetVector(p));

export { Deco, DecoPale, _decoVector, deco };
