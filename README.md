# fastify-xss-filter

[![Build Status][ci-img]][ci-url]
[![Code coverage][cov-img]][cov-url]
[![Code style][lint-img]][lint-url]
[![Dependency Status][dep-img]][dep-url]
[![Dev Dependency Status][dev-dep-img]][dev-dep-url]
[![NPM version][npm-ver-img]][npm-url]
[![NPM downloads][npm-dl-img]][npm-url]
[![NPM license][npm-lc-img]][npm-url]

Fastify plugin to set the X-XSS-Protection header.

## Why?

You may know [x-xss-protection](https://github.com/helmetjs/x-xss-protection) as a [xss filter middleware](https://helmetjs.github.io/docs/xss-filter/) used in [helmet](https://github.com/helmetjs/helmet). And you could use it as a middleware in fastify also. So why i made this plugin?

You may find the reason in [benchmark result](./benchmarks/benchmark.txt) and wish you like it. :)

## Difference

This plugin has passed all [x-xss-protection](https://github.com/helmetjs/x-xss-protection) test cases.
And no difference in options.

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

Force to set header for IE whos version under 9. Default is `false`.

## Changelog

- 0.2.0:
  - Add test case
  - Add code coverage
  - Add benchmarks
- 0.1.0:
  - Init version

[ci-img]: https://img.shields.io/travis/poppinlp/fastify-xss-filter.svg?style=flat-square
[ci-url]: https://travis-ci.org/poppinlp/fastify-xss-filter
[cov-img]: https://img.shields.io/coveralls/poppinlp/fastify-xss-filter.svg?style=flat-square
[cov-url]: https://coveralls.io/github/poppinlp/fastify-xss-filter?branch=master
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
