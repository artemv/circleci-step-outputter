# circle-step-outputter [![Build Status](https://travis-ci.org/artemv/circle-step-outputter.svg?branch=master)](https://travis-ci.org/artemv/circle-step-outputter) [![codecov](https://codecov.io/gh/artemv/circle-step-outputter/badge.svg?branch=master)](https://codecov.io/gh/artemv/circle-step-outputter?branch=master)

> Writes CircleCI step output to a file


## Install

```
$ npm install circle-step-outputter
```


## Usage

```js
const circleStepOutputter = require('circle-step-outputter');

circleStepOutputter('unicorns');
//=> 'unicorns & rainbows'
```


## API

### circleStepOutputter(input, [options])

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.


## CLI

```
$ npm install --global circle-step-outputter
```

```
$ circle-step-outputter --help

  Usage
    circle-step-outputter [input]

  Options
    --foo  Lorem ipsum [Default: false]

  Examples
    $ circle-step-outputter out.json
```


## License

MIT © [Artem Vasiliev](https://github.com/artemv)
