import { presetTable } from '@spare/preset-deco';
import { MUTATE_PIGMENT } from '@palett/enum-colorant-modes';
import { fluoMatrix } from '@palett/fluo-matrix';
import { fluoVector } from '@palett/fluo-vector';
import { AEU } from '@spare/enum-chars';
import { liner } from '@spare/liner';
import { tableMargin } from '@spare/table-margin';
import { tablePadder } from '@spare/table-padder';
import { size } from '@vect/matrix';
import { acquire } from '@vect/vector-merge';

const _decoTable = function (table) {
  var _head;

  const config = this;
  if (!table) return AEU;
  let head = table.head || table.banner,
      rows = table.rows || table.matrix,
      rule = null;
  const [height, width] = size(rows),
        labelWidth = (_head = head) === null || _head === void 0 ? void 0 : _head.length;
  if (!height || !width || !labelWidth) return AEU;
  table = tableMargin(table, config); // use: top, left, bottom ,right, read, headRead

  ({
    head,
    rule,
    rows
  } = tablePadder(table, config)); // use: ansi, fullAngle

  const {
    presets
  } = config; // presets |> deco |> logger

  if (presets) {
    const [alpha, beta, gamma] = presets;
    head = fluoVector.call(MUTATE_PIGMENT, head, [alpha, gamma !== null && gamma !== void 0 ? gamma : beta]);
    rows = fluoMatrix.call(MUTATE_PIGMENT, rows, config.direct, [alpha, beta]);
  }

  const lines = acquire([head.join(' | '), rule.join('-+-')], rows.map(row => row.join(' | ')));
  return liner(lines, config); // use: discrete, delim, level
};

/**
 * @typedef {{[max]:string|*[],[min]:string|*[],[na]:string|*[]}} Preset
 */

/***
 *
 * @param {Object} p
 *
 * @param {boolean} [p.discrete]
 * @param {string} [p.delim=',\n']
 *  - currently not functional, keeps for future fix
 * @param {boolean|number} [p.bracket] - currently not functional, keeps for future fix
 *
 * @param {Function} [p.read]
 * @param {Function} [p.headRead]
 *
 * @param {Object|Object[]} [p.presets=[FRESH, JUNGLE]]
 * @param {Object} [p.labelPreset=SUBTLE]
 * @param {number} [p.direct=COLUMNWISE]
 *
 * @param {number} [p.top]
 * @param {number} [p.bottom]
 * @param {number} [p.left]
 * @param {number} [p.right]

 * @param {boolean} [p.ansi=true]
 * @param {boolean} [p.fullAngle]
 * @param {number} [p.level=0]
 *
 * @returns {string}
 */

const Deco = (p = {}) => _decoTable.bind(presetTable(p));
/***
 *
 * @param {Object} table
 * @param {Object} p
 *
 * @param {boolean} [p.discrete]
 * @param {string} [p.delim=',\n']
 *  - currently not functional, keeps for future fix
 * @param {boolean|number} [p.bracket] - currently not functional, keeps for future fix
 *
 * @param {Function} [p.read]
 * @param {Function} [p.headRead]
 *
 * @param {Object|Object[]} [p.presets=[FRESH, JUNGLE]]
 * @param {Object} [p.labelPreset=SUBTLE]
 * @param {number} [p.direct=COLUMNWISE]
 *
 * @param {number} [p.top]
 * @param {number} [p.bottom]
 * @param {number} [p.left]
 * @param {number} [p.right]

 * @param {boolean} [p.ansi=true]
 * @param {boolean} [p.fullAngle]
 * @param {number} [p.level=0]
 *
 * @returns {string}
 */

const deco = (table, p = {}) => _decoTable.call(presetTable(p), table);

export { Deco, _decoTable, deco };
