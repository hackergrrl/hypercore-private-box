var hbox = require('.')
var hypercore = require('hypercore')
var ram = require('random-access-memory')

var core = hypercore(ram, { valueEncoding: 'json' })
var text = Buffer.from('hello secure world!')

core.ready(function () {
  var ctext = hbox.box(text, core)
  console.log(ctext)
  var result = hbox.unbox(ctext, core)
  console.log(result.toString())
})

