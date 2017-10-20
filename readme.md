# circle-step-outputter 
[![CircleCI](https://circleci.com/gh/artemv/circleci-step-outputter.svg?style=svg)](https://circleci.com/gh/artemv/circleci-step-outputter)

Writes CircleCI step output to a file


## Install

```
$ npm install circle-step-outputter
```


## Usage

## CLI

```
$ npm install --global circle-step-outputter
```

```
$ circle-step-outputter --help

  Writes CircleCI build step output to a file

  Usage
    $ circle-step-outputter [options]

  Options
    --baseFileName [Default: "test-output"]
    --repoSlug [Default: $CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME]
    --buildNum [Default: $CIRCLE_BUILD_NUM]
    --token [Default: $CIRCLE_API_TOKEN]
    --stepName [Default: "npm test"]

  Examples
    $ circle-step-outputter --repoSlug="artemv/test-lib" --buildNum=2
  This will write test-output.json, or test-output0.txt, test-output1.txt ... test-output4.txt if there are
  multiple actions in the step (usually parallel actions).
```

## API

```js
const circleStepOutputter = require('circle-step-outputter');

circleStepOutputter({repoSlug: "artemv/test-lib", buildNum: 2});
```

### circleStepOutputter([options])

#### options

Type: `Object`

See CLI section for options list.

## License

MIT © [Artem Vasiliev](https://github.com/artemv)
