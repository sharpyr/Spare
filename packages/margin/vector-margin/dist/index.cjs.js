'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var util = require('@spare/util');
var vectorMargin$1 = require('@vect/vector-margin');
var oneself = require('@ject/oneself');

const sizing = (ar, head, tail) => {
  let l,
      dash = true;
  if (!(l = ar === null || ar === void 0 ? void 0 : ar.length)) [head, tail, dash] = [0, 0, false];
  if (!head && !tail || head >= l) [head, tail, dash] = [l, 0, false];
  return {
    head,
    tail,
    dash
  };
};

/**
 *
 * @param {*[]} vec
 * @param {number} [head]
 * @param {number} [tail]
 * @param {Function} [read]
 * @param {string} [rule='..']
 * @return {string[]}
 */

const vectorMargin = (vec, {
  head,
  tail,
  read,
  rule = '...'
} = {}) => VectorMargin.build(vec, head, tail).stringify(read).toVector(rule);
class VectorMargin {
  constructor(vec, head, tail, dash) {
    this.vec = vec;
    this.head = head;
    this.tail = tail;
    this.dash = dash;
  }

  static build(ar, h = 0, t = 0) {
    const {
      head,
      tail,
      dash
    } = sizing(ar, h, t);
    const margined = vectorMargin$1.marginCopy(ar, head, tail);
    return new VectorMargin(margined, head, tail, dash);
  }

  map(fn, mutate = false) {
    const {
      vec,
      head,
      tail
    } = this;
    return mutate ? this.reboot(vectorMargin$1.marginMutate(vec, fn, head, tail)) : this.clone(vectorMargin$1.marginMapper(vec, fn, head, tail));
  }

  stringify(fn, mutate = true) {
    return this.map(fn ? _ => String(fn(_)) : util.totx, mutate);
  }
  /** @return {*[]} */


  toVector(el) {
    const {
      vec,
      head,
      tail
    } = this,
          dif = vec.length - (head + tail),
          ar = vec.slice();
    this.dash && el ? ar.splice(head, dif, el) : ar.splice(head, dif);
    return ar;
  }

  reboot(ar) {
    if (ar) this.vec = ar;
    return this;
  }

  clone(ar) {
    return new VectorMargin(ar, this.head, this.tail, this.dash);
  }

}

/**
 *
 * @param {*[]} arr
 * @param {*|number} [head]
 * @param {*|number} [tail]
 * @param {*|function(*):string} [read]
 * @param {*|string} [rule='..']
 * @return {{raw:*[],alt:*[]}}
 */

const vettro = (arr, {
  head,
  tail,
  read,
  rule = '...'
} = {}) => {
  const vn = VectorMargin.build(arr, head, tail);
  return {
    raw: vn.map(oneself.oneself).toVector(rule),
    alt: vn.stringify(read).toVector(rule)
  };
};

exports.VectorMargin = VectorMargin;
exports.sizing = sizing;
exports.vectorMargin = vectorMargin;
exports.vettro = vettro;
