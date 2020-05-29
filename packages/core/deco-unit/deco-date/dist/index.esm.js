import { OCEAN, PLANET } from '@palett/presets';
import { Colorant } from '@palett/projector';
import { DASH, RT } from '@spare/enum-chars';

const dyeY = Colorant({
  min: 1990,
  max: 2030
}, OCEAN);
const dyeM = Colorant({
  min: 1,
  max: 12
}, OCEAN);
const dyeD = Colorant({
  min: 1,
  max: 31
}, PLANET);
const dyeh = Colorant({
  min: 1,
  max: 24
}, PLANET);
const dyes = Colorant({
  min: 1,
  max: 60
}, PLANET);

const p4 = x => x >= 1000 ? '' + x : x.padStart(4, '0');

const p2 = x => x >= 10 ? '' + x : '0' + x;

const decoDate = date => {
  var _p, _p2, _p3;

  const Y = date.getFullYear(),
        M = date.getMonth() + 1,
        D = date.getDate();
  return (_p = p4(Y), dyeY(Y)(_p)) + DASH + (_p2 = p2(M), dyeM(M)(_p2)) + DASH + (_p3 = p2(D), dyeD(D)(_p3));
};
const decoTime = date => {
  var _p4, _p5, _p6;

  const h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds();
  return (_p4 = p2(h), dyeh(h)(_p4)) + RT + (_p5 = p2(m), dyes(m)(_p5)) + RT + (_p6 = p2(s), dyes(s)(_p6));
};
const decoDateTime = date => decoDate(date) + '\'' + decoTime(date);

export { decoDate, decoDateTime, decoTime };
