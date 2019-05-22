var hbox = require('..')
var hypercore = require('hypercore')
var ram = require('random-access-memory')
var test = require('tape')

test('simple box + unbox', function (t) {
  var core = hypercore(ram, { valueEncoding: 'json' })
  var text = Buffer.from('hello secure world!')

  core.ready(function () {
    var ctext = hbox.box(text, [core.key])
    var result = hbox.unbox(ctext, core.secretKey)
    t.same(result, text, 'core can decrypt ok')
    t.end()
  })
})

test('multi-recipient box + unbox', function (t) {
  var core1 = hypercore(ram, { valueEncoding: 'json' })
  var core2 = hypercore(ram, { valueEncoding: 'json' })
  var text = Buffer.from('hello secure world!')

  core1.ready(function () {
    core2.ready(function () {
      var ctext = hbox.box(text, [core1.key, core2.key])
      var result1 = hbox.unbox(ctext, core1.secretKey)
      var result2 = hbox.unbox(ctext, core2.secretKey)
      t.same(result1, text, 'core 1 can decrypt ok')
      t.same(result2, text, 'core 2 can decrypt ok')
      t.end()
    })
  })
})

