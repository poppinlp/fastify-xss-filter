# fastify-xss-filter

[![Code style][lint-img]][lint-url]
[![Dependency Status][dep-img]][dep-url]
[![Dev Dependency Status][dev-dep-img]][dev-dep-url]
[![NPM version][npm-ver-img]][npm-url]
[![NPM downloads][npm-dl-img]][npm-url]
[![NPM license][npm-lc-img]][npm-url]

Fastify plugin to set the X-XSS-Protection header.

## Why?

You may know [x-xss-protection](https://github.com/helmetjs/x-xss-protection) as a [xss filter middleware](https://helmetjs.github.io/docs/xss-filter/) used in [helmet](https://github.com/helmetjs/helmet). And you could use it as a middleware in fastify also. So why i made this plugin?

Benchmark with no plugin:

```txt
Running 20s test @ http://127.0.0.1:10290/pudge/rest/v0/benchmark
1000 connections

Stat         Avg     Stdev   Max
Latency (ms) 29.62   201.16  9996.68
Req/Sec      30136   1750.17 31056
Bytes/Sec    4.49 MB 278 kB  4.63 MB

603k requests in 20s, 89.8 MB read
```

Benchmark with x-xss-protection as middleware:

```txt
Running 20s test @ http://127.0.0.1:10290/pudge/rest/v0/benchmark
1000 connections

Stat         Avg     Stdev   Max
Latency (ms) 30.25   201.87  9981.01
Req/Sec      26897.6 1901.29 27645
Bytes/Sec    4.93 MB 366 kB  5.03 MB

538k requests in 20s, 97.9 MB read
297 errors (297 timeouts)
```

Benchmark with this plugin:

```txt
Running 20s test @ http://127.0.0.1:10290/pudge/rest/v0/benchmark
1000 connections

Stat         Avg     Stdev  Max
Latency (ms) 33.83   19.34  2671.11
Req/Sec      29153.6 898.09 29720
Bytes/Sec    5.32 MB 178 kB 5.41 MB

583k requests in 20s, 106 MB read
```

So that's the reason and wish you like it. :)

## Install

Via npm:

```shell
npm i fastify-xss-filter
```

Via yarn:

```shell
yarn add fastify-xss-filter
```

## Usage

```js
const fastify = require('fastify');
const fastifyXssFilter = require('fastify-xss-filter');

const app = fastify();
app.register(fastifyXssFilter, {
  // Your options
});

app.listen(3000, err => {
  if (err) throw err;
});
```

## Option

This plugin has the same options as helmet.

### reportUri {string}

Set report URI in header, you may find more detail [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection).

### setOnOldIE {boolean}

Force to set header for IE whos version under 9.

## Changelog

- 0.1.0: Init version

## Todo

- Add test case
- Add ci
- Add benchmark scripts

[lint-img]: https://img.shields.io/badge/code%20style-handsome-brightgreen.svg?style=flat-square
[lint-url]: https://github.com/poppinlp/eslint-config-handsome
[dep-img]: https://img.shields.io/david/poppinlp/fastify-xss-filter.svg?style=flat-square
[dep-url]: https://david-dm.org/poppinlp/fastify-xss-filter
[dev-dep-img]: https://img.shields.io/david/dev/poppinlp/fastify-xss-filter.svg?style=flat-square
[dev-dep-url]: https://david-dm.org/poppinlp/fastify-xss-filter#info=devDependencies
[npm-ver-img]: https://img.shields.io/npm/v/fastify-xss-filter.svg?style=flat-square
[npm-dl-img]: https://img.shields.io/npm/dm/fastify-xss-filter.svg?style=flat-square
[npm-lc-img]: https://img.shields.io/npm/l/fastify-xss-filter.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/fastify-xss-filter
