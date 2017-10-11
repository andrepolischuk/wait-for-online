# wait-for-online [![Build Status][travis-image]][travis-url]

> Wait for a browser to be online

Good for the chain of promises or `async`/`await`.

## Install

```sh
npm install --save wait-for-online
```

## Usage

```js
import waitForOnline from 'wait-for-online'

async function send (data) {
  await waitForOnline()
  await sendToApi(data)
}

send({foo: 1})
```

## API

### waitForOnline([timeout])

Returns a promise that resolves, when browser will be online.

#### timeout

Type: `number`  
Default: `Infinity`

Waiting timeout.

## License

MIT

[travis-url]: https://travis-ci.org/andrepolischuk/wait-for-online
[travis-image]: https://travis-ci.org/andrepolischuk/wait-for-online.svg?branch=master
