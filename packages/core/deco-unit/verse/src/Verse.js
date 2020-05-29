import { matchSlice as matchSliceCrostab } from '@analys/crostab-init'
import { matchSlice as matchSliceTable }   from '@analys/table-init'
import { brace, bracket as doBracket }     from '@spare/bracket'
import { cosmetics as cosmeticsEntries }   from '@spare/deco-entries'
import { cosmetics as cosmeticsMatrix }    from '@spare/deco-matrix'
import { cosmetics as cosmeticsObject }    from '@spare/deco-object'
import { cosmetics as cosmeticsSamples }   from '@spare/deco-samples'
import { cosmetics as cosmeticsVector }    from '@spare/deco-vector'
import { BRACE, BRACKET }                  from '@spare/enum-brackets'
import { joinLines, liner }                from '@spare/liner'
import {
  presetCrostab,
  presetEntries,
  presetEntriesAsObject,
  presetMatrix,
  presetObject,
  presetSamples,
  presetTable,
  presetVector
}                                          from '@spare/preset-verse'

const SIDE = 'side', HEAD = 'head', ROWS = 'rows'

export class Verse {
  /**
   * @param {Array} vector
   * @param {Object} p
   *
   * @param {string} [p.delim=', ']
   * @param {number} [p.quote=NONE]
   *
   * @param {Function} [p.read=decoValue]
   *
   * @param {number} [p.level]
   *
   * @return {string}
   */
  static vector (vector, p = {}) {
    return cosmeticsVector.call(presetVector(p), vector)
  }

  /**
   *
   * @param {[*,*][]} entries
   * @param {Object} p
   *
   * @param {string} [p.dash=', ']
   * @param {string} [p.delim=',\n']
   * @param {number} [p.keyQuote=NONE]
   * @param {number} [p.quote=NONE]
   *
   * @param {Function} [p.keyRead] - if objectify, default to decoKey, otherwise default to decoValue
   * @param {Function} [p.read=decoValue]
   *
   * @param {boolean} [p.objectify=false]
   * @param {number} [p.level]
   *
   * @return {string}
   */
  static entries (entries, p = {}) {
    const [preset, bracket] = (p?.objectify)
      ? [presetEntriesAsObject(p), BRACE]
      : [presetEntries(p), BRACKET]
    const { delim, level } = preset
    const lines = cosmeticsEntries.call(preset, entries)
    return liner(lines, { bracket, delim, level })
  }

  /**
   * @param {Object} o
   * @param {Object} p
   *
   * @param {string} [p.dash=': ']
   * @param {string} [p.delim=',\n']
   * @param {number} [p.quote=NONE]
   *
   * @param {Function} [p.keyRead=keyRead]
   * @param {Function} [p.read=decoValue]
   *
   * @param {number} [p.level]
   *
   * @returns {string}
   */
  static object (o, p = {}) { return cosmeticsObject.call(presetObject(p), o) }

  /**
   * @param {*[][]} matrix
   * @param {Object} p
   *
   * @param {string} [p.delim=', ']
   * @param {number} [p.quote=NONE]
   *
   * @param {Function} [p.read=decoValue]
   *
   * @param {number} [p.level]
   *
   * @returns {string}
   */
  static matrix (matrix, p = {}) {
    p = presetMatrix(p)
    const { delim, level } = p
    const lines = cosmeticsMatrix.call(p, matrix)
    return joinLines(lines, delim, level) |> doBracket
  }

  /**
   * @param {Object[]} samples
   * @param {Object} p
   *
   * @param {string} [p.delim=', ']
   * @param {number} [p.quote=NONE]
   *
   * @param {Function} [p.read=decoValue]
   *
   * @param {number} [p.level]
   *
   * @returns {string}
   */
  static samples (samples, p = {}) {
    p = presetSamples(p)
    const { delim, level } = p
    const lines = cosmeticsSamples.call(p, samples)
    return joinLines(lines, delim, level) |> doBracket
  }

  /**
   * @param {Object} crostab
   * @param {Object} p
   *
   * @param {string} [p.delim=', ']
   * @param {number} [p.keyQuote=NONE]
   * @param {number} [p.quote=NONE]
   *
   * @param {Function} [p.keyRead=decoKey]
   * @param {Function} [p.read=decoValue]
   *
   * @param {number} [p.level]
   *
   * @returns {string}
   */
  static crostab (crostab, p = {}) {
    p = presetCrostab(p)
    const { side, head, rows } = crostab |> matchSliceCrostab
    const { delim, level, keyRead } = p
    const [s, h, r] = keyRead ? [SIDE, HEAD, ROWS].map(keyRead) : [SIDE, HEAD, ROWS]
    const lines = [
      s + ': ' + Verse.vector(side, p),
      h + ': ' + Verse.vector(head, p),
      r + ': ' + Verse.matrix(rows, p)
    ]
    return joinLines(lines, delim, level - 1) |> brace
  }

  /**
   * @param {Object} table
   * @param {Object} p
   *
   * @param {string} [p.delim=', ']
   * @param {number} [p.keyQuote=NONE]
   * @param {number} [p.quote=NONE]
   *
   * @param {Function} [p.keyRead=decoKey]
   * @param {Function} [p.read=decoValue]
   *
   * @param {number} [p.level]
   *
   * @returns {string}
   */
  static table (table, p = {}) {
    p = presetTable(p)
    const { head, rows } = table |> matchSliceTable
    const { delim, level, keyRead } = p
    const [h, r] = keyRead ? [HEAD, ROWS].map(keyRead) : [HEAD, ROWS]
    const lines = [
      h + ': ' + Verse.vector(head, p),
      r + ': ' + Verse.matrix(rows, p)
    ]
    return joinLines(lines, delim, level - 1) |> brace
  }
}


