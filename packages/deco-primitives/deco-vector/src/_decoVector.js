import { fluoVector }     from '@palett/fluo-vector'
import { _decoEntries }   from '@spare/deco-entries'
import { liner }          from '@spare/liner'
import { vectorMargin }   from '@spare/vector-margin'
import { MUTATE_PIGMENT } from '@palett/enum-colorant-modes'

const fluo = fluoVector.bind(MUTATE_PIGMENT)

export function _decoVector(vec = []) {
  const config = this
  if (config?.indexed) return _decoEntries.call(config, Object.entries(vec))
  vec = vectorMargin(vec, config) // use: head, tail, read, rule
  if (config.fluos) vec = fluo(vec, config.fluos) // use:  presets, effects
  return liner(vec, config)
}
