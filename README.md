# hypercore-private-box

> Encrypt messages that only members of a set of hypercores can decrypt.

Wraps [private-box](https://github.com/auditdrivencrypto/private-box) to support hypercore (ed25519) keys.

## Usage

```js
var hbox = require('hypercore-private-box')
var hypercore = require('hypercore')
var ram = require('random-access-memory')

var core = hypercore(ram, { valueEncoding: 'json' })
var text = Buffer.from('hello secure world!')

core.ready(function () {
  var ctext = hbox.box(text, core)
  console.log(ctext)
  var result = hbox.unbox(ctext, core)
  console.log(result)
})
```

outputs

```
<Buffer e6 48 ed 48 2a bc 81 3b ae 32 80 ... >
hello secure world!
```

## API

```js
var hbox = require('hypercore-private-box')
```

### var ctext = hbox.box(buf, recipients)

Encrypts the buffer `buf` such that only the `recipients` (array of 1-7 hypercores) can decrypt.

### var res = hbox.unbox(buf, core)

Decrypts the ciphertext buffer `buf` using the hypercore `core`. Returns `undefined` if the buffer could not be decrypted.

## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install hypercore-private-box
```

## License

ISC

