import { presetEntries } from '@spare/preset-deco';
import { oneself } from '@ject/oneself';
import { COLORANT } from '@palett/enum-colorant-modes';
import { fluoEntries } from '@palett/fluo-entries';
import { Br } from '@spare/bracket';
import { enttro } from '@spare/enttro';
import { liner } from '@spare/liner';
import { padEntries } from '@spare/pad-entries';
import { zipper } from '@vect/entries-zipper';

const HR_ENTRY = ['..', '..'];

const cosmetics = function (entries = []) {
  var _entries;

  if (!((_entries = entries) === null || _entries === void 0 ? void 0 : _entries.length)) return liner([], this);
  const {
    keyRead,
    read,
    head,
    tail,
    ansi,
    dash,
    delim,
    bracket,
    presets,
    effects
  } = this;
  const {
    raw,
    text
  } = enttro(entries, {
    head,
    tail,
    keyRead,
    read,
    hr: HR_ENTRY
  });
  const dye = presets ? fluoEntries.call(COLORANT, raw, presets, effects) : null;
  entries = /\n/.test(delim) ? padEntries(text, {
    raw,
    dye,
    ansi: presets || ansi
  }) : presets ? zipper(text, dye, (tx, dy) => {
    var _tx;

    return _tx = tx, dy(_tx);
  }) : text;
  const brk = Br(bracket) || oneself;
  const lines = entries.map(([k, v]) => brk(k + dash + v.trimRight()));
  return liner(lines, this);
};

/**
 * @typedef {{[max]:string|*[],[min]:string|*[],[na]:string|*[]}} Preset
 */

/**
 *
 * @param {Object} p
 *
 * @param {boolean} [p.discrete]
 * @param {string} [p.dash=' > ']
 * @param {string} [p.delim='\n']
 *
 * @param {boolean|number} [p.bracket=true]
 *
 * @param {Function} [p.keyRead]
 * @param {Function} [p.read]
 *
 * @param {Object|Object[]} [p.presets=[FRESH, OCEAN]]
 *
 * @param {number} [p.head]
 * @param {number} [p.tail]
 *
 * @param {boolean} [p.ansi]
 * @param {number} [p.level=0]
 *
 * @returns {Function}
 */

const Deco = (p = {}) => cosmetics.bind(presetEntries(p));
/***
 *
 * @param {[*,*][]} entries
 * @param {Object} p
 *
 * @param {boolean} [p.discrete]
 * @param {string} [p.dash=' > ']
 * @param {string} [p.delim='\n']
 *
 *
 * @param {boolean|number} [p.bracket=true]
 *
 * @param {Function} [p.keyRead]
 * @param {Function} [p.read]
 *
 * @param {Object|Object[]} [p.presets=[FRESH, OCEAN]]
 *
 * @param {number} [p.head]
 * @param {number} [p.tail]
 *
 * @param {boolean} [p.ansi]
 * @param {number} [p.level=0]
 *
 * @returns {string}
 */

const deco = (entries, p = {}) => cosmetics.call(presetEntries(p), entries);

export { Deco, cosmetics, deco };