'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var enumChars = require('@spare/enum-chars');
var enumFullAngleChars = require('@spare/enum-full-angle-chars');
var charset = require('@spare/charset');

const CJK_PUNCS = '\u3000-\u303f';
const CJK_LETTERS = '\u4e00-\u9fbf';
const FULL_CHARS = '\uff00-\uffef'; // full letters + full puncs
const FULL_NUM = '０-９'; // 0xff10 - 0xff19

const HAN = new RegExp(`[${CJK_PUNCS}${CJK_LETTERS}${FULL_CHARS}]`); // HAN ideographs

const REG_FULL = new RegExp(`[${CJK_PUNCS}${FULL_CHARS}]+`, 'g'); // /[\uff01-\uff5e|\u3000]+/g
const DELTA_FULL = 0xfee0; // export const REG_NUM_FULL = /^\s*[－＋]?(?:，*[０-９]+)*．?[０-９]+\s*$/

const REG_NUM_FULL = new RegExp(`^\s*[－＋]?(?:，*[${FULL_NUM}]+)*．?[${FULL_NUM}]+\s*$`);

/**
 * Full-angle string -> Half-angle string
 * 全角转换为半角
 * @param {string} text
 * @returns {string}
 * @constructor
 */

const fullToHalf = text => {
  let ms,
      l = 0,
      r = 0,
      sp,
      ph,
      body = '';

  while ((ms = REG_FULL.exec(text)) && ([ph] = ms)) {
    r = ms.index;
    if (l !== r && (sp = text.slice(l, r))) body += sp;
    body += toHalfWidth(ph);
    l = REG_FULL.lastIndex;
  }

  if (l < (text === null || text === void 0 ? void 0 : text.length)) body += text.slice(l);
  return body;
};

const toHalfWidth = text => {
  let tx = '',
      i = 0,
      l = text.length,
      n;

  while (i < l && (n = text.charCodeAt(i++))) tx += n < 0xff00 ? CharCodeToHalf.cjkPunc(n) : CharCodeToHalf.full(n);

  return tx;
};

class CharCodeToHalf {
  static cjkPunc(charCode) {
    if (charCode === 0x3000) return enumChars.SP;
    if (charCode === 0x3001) return enumChars.CO;
    if (charCode === 0x3002) return enumChars.DOT;
    if (charCode === 0x3010) return '[';
    if (charCode === 0x3011) return ']';
    return String.fromCharCode(charCode);
  }

  static full(charCode) {
    return String.fromCharCode(0xFF & charCode + 0x20);
  }

}

/**
 * Half-angle string -> Full-angle string
 * 半角转化为全角
 * a.全角空格为12288，半角空格为32
 * b.其他字符半角(33-126)与全角(65281-65374)的对应关系是：均相差65248
 * @param {string} text
 * @returns {string}
 * @constructor
 */

const halfToFull = text => {
  let l = text === null || text === void 0 ? void 0 : text.length,
      i = 0,
      t = '',
      n;

  while (i < l && (n = text.charCodeAt(i))) {
    t += n === 0x20 ? enumFullAngleChars.SP : 0x20 < n && n < 0x7f ? String.fromCharCode(n + DELTA_FULL) : text[i];
    i++;
  }

  return t;
};

/**
 * Return if a string contains Chinese character.
 * halfAng = str.match(/[\u0000-\u00ff]/g) || [] //半角
 * chinese = str.match(/[\u4e00-\u9fa5]/g) || [] //中文
 * fullAng = str.match(/[\uff00-\uffff]/g) || [] //全角
 * @param {string} str
 * @returns {boolean}
 */

const hasFull = str => HAN.test(str);

const fullWidth = (text, {
  ansi = true,
  lean = true
} = {}) => fw.call({
  ansi,
  lean
}, text);
const FullWidth = ({
  ansi = true,
  lean = true
} = {}) => fw.bind({
  ansi,
  lean
});
const LEAN_REG = /(\W)\s+/g;
const fw = function (tx) {
  const {
    ansi,
    lean
  } = this;
  if (ansi && charset.hasAnsi(tx)) tx = charset.clearAnsi(tx);
  if (lean) tx = tx.replace(LEAN_REG, (_, x) => x);
  return halfToFull(tx);
};

const isNumeric = tx => REG_NUM_FULL.test(tx);

exports.FullWidth = FullWidth;
exports.fullToHalf = fullToHalf;
exports.fullWidth = fullWidth;
exports.halfToFull = halfToFull;
exports.hasFull = hasFull;
exports.isNumeric = isNumeric;
