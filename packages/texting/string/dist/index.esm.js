import { hasAnsi, clearAnsi } from '@spare/charset';
import { halfToFull } from '@spare/fullwidth';
import { isTab, deNaTab, endsBracs, afterNaTab } from '@spare/util';
import { RN, TB } from '@spare/enum-chars';

/**
 *
 * @param tx
 * @return {string}
 * @deprecated
 */

const toFullAngleWoAnsi = function (tx) {
  if (hasAnsi(tx)) tx = clearAnsi(tx);
  return halfToFull(tx);
};

const FullAngleReg = /[\u4e00-\u9fa5]|[\uff00-\uffff]/;

/**
 * Return if a string contains Chinese character.
 * halfAng = str.match(/[\u0000-\u00ff]/g) || [] //半角
 * chinese = str.match(/[\u4e00-\u9fa5]/g) || [] //中文
 * fullAng = str.match(/[\uff00-\uffff]/g) || [] //全角
 * @param {string} str
 * @returns {boolean}
 */
/**
 *
 * @param str
 * @return {boolean}
 * @deprecated
 */

const hasChn = str => str.search(FullAngleReg) !== -1;

const SP_CODE = 12288;
const CH_GAP = 65248;
/**
 * Half-angle string -> Full-angle string
 * 半角转化为全角
 * a.全角空格为12288，半角空格为32
 * b.其他字符半角(33-126)与全角(65281-65374)的对应关系是：均相差65248
 * @param {string} text
 * @returns {string}
 * @deprecated
 */

const toFullAngle = text => {
  let i = 0,
      t = '',
      n;
  const l = text.length;

  while (i < l && (n = text.charCodeAt(i++))) {
    if (n === 32) {
      t += String.fromCharCode(SP_CODE);
    } else if (n < 127) {
      t += String.fromCharCode(n + CH_GAP);
    } else {
      t += String.fromCharCode(n);
    }
  }

  return t;
};
/**
 * Full-angle string -> Half-angle string
 * 全角转换为半角
 * @param {string} tx
 * @returns {string}
 * @deprecated
 */


const toHalfAngle = tx => {
  let t = '',
      co;

  for (let c of tx) {
    co = c.charCodeAt(0);
    t += co === 12288 ? String.fromCharCode(co - 12256) : 65280 < co && co < 65375 ? String.fromCharCode(co - 65248) : String.fromCharCode(co);
  }

  return t;
};

const indexNonTab = tx => {
  let i = 0;

  for (let {
    length
  } = tx; i < length; i++) if (!isTab(tx.charAt(i))) return i;

  return i;
};

const afterNonTab = tx => tx.substring(deNaTab(tx));

function narrow(tx, lb, rb) {
  const [li, ri] = [tx.indexOf(lb), tx.lastIndexOf(rb)];
  return li > 0 && ri > 0 ? tx.slice(li, ri + rb.length) : tx;
}

function narrowExclude(tx, lb, rb) {
  const [li, ri] = [tx.indexOf(lb), tx.lastIndexOf(rb)];
  return li && ri ? tx.slice(li + lb.length, ri) : tx;
}

const wL = (tx = '') => {
  console.log(tx);
};

const tag = (label, item) => {
  const i = deNaTab(label);
  let [key, text] = [endsBracs(label) ? label : `${label.substring(0, i)}[${label.substring(i)}]`, `${item}`];

  if (text.includes('\n')) {
    const t = ' '.repeat(i);
    text = (text.endsWith('}') || text.endsWith(']')) && !text.endsWith(']]') ? afterNaTab(text.split(RN).map(x => t + x).join(RN)) : ['', ...text.split(RN).map(x => t + TB + x), t].join(RN);
  }

  return `${key} (${text})`;
};

// from x => typeof x
const STR = 'string';

const v1 = word => (word.toLowerCase().charCodeAt(0) & 0x7f) << 21;

const v2 = word => (((word = word.toLowerCase()).charCodeAt(0) & 0x7f) << 21) + ((word.charCodeAt(1) & 0x7f) << 14);

const v3 = word => (((word = word.toLowerCase()).charCodeAt(0) & 0x7f) << 21) + ((word.charCodeAt(1) & 0x7f) << 14) + ((word.charCodeAt(2) & 0x7f) << 7);

const v4 = word => (((word = word.toLowerCase()).charCodeAt(0) & 0x7f) << 21) + ((word.charCodeAt(1) & 0x7f) << 14) + ((word.charCodeAt(2) & 0x7f) << 7) + (word.charCodeAt(3) & 0x7f);
/**
 *
 * @param word
 * @return {number|*}
 * @deprecated use stringValue in @spare/string-value instead
 */


const stringValue = word => {
  const l = word === null || word === void 0 ? void 0 : word.length;
  if (!l) return NaN;
  if (typeof word !== STR) return NaN;
  if (l >= 8) return (v4(word.slice(0, 4)) << 2) + v4(word.slice(-4));
  if (l === 7) return (v4(word.slice(0, 4)) << 2) + v3(word.slice(-3));
  if (l === 6) return (v4(word.slice(0, 4)) << 2) + v2(word.slice(-2));
  if (l === 5) return (v4(word.slice(0, 4)) << 2) + v1(word.slice(-1));
  if (l === 4) return v4(word) << 2;
  if (l === 3) return v3(word) << 2;
  if (l === 2) return v2(word) << 2;
  if (l === 1) return v1(word) << 2;
};

export { afterNonTab, hasChn, indexNonTab, narrow, narrowExclude, stringValue, tag, toFullAngle, toFullAngleWoAnsi, toHalfAngle, wL };
