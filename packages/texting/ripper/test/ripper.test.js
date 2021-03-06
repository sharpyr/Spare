import { deco }    from '@spare/deco'
import { says }    from '@spare/logger'
import { LITERAL } from '@spare/regex-phrasing'
import { ripper }  from '../src/ripper'

export const candidates = {
  dot: 'foo.bar.zen.NASA.Lite.DB',
  snake: '__foo_bar_zen_NASA_Lite_DB',
  mixed: 'FOOBarROCKAndROLL_NASALiteDB',
  slashed: 'foo/bar/zen/NASA/Lite/DB',
  file: 'foo.barZen10th-2022.pdf',
  method: 'sendHTTPRequestAsync ',
  numbers: '256.512.1024.2048',
  url: 'https://www.foo-bar.com/main?format=json&slice=20',
  camel: 'fooBarROCKAndROLL李白杜甫ZenNASALiteDB',
}


for (let [key, word] of Object.entries(candidates)) {
  ripper.call(LITERAL, word) |> deco |> says[key]
}