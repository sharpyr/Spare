import { flop, flopValue }                          from '@aryth/rand'
import { Quotes }                                   from '@foba/quotes-creativity'
import { logger }                                   from '@spare/logger'
import { Deco, deco }                               from '../index'
import { Basics, Matrices, Misc, Objects, Vectors } from './assets/candidates'

const candidates = {
  ...Basics,
  ...Vectors,
  ...Matrices,
  ...Objects,
  ...Misc,
  ...(Quotes |> flopValue |> flop)
}

candidates |> Deco({
  presets: null,
  depth: 10,
  string: { presets: null }
  // array: { vert: 1 },
  // object: { vert: 1 }
}) |> logger

null |> deco |> logger;
({ some: null }) |> deco |> logger
