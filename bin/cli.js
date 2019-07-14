#!/usr/bin/env node
'use strict';
const meow = require('meow');
const circleStepOutputter = require('..');
const env = process.env;

const cli = meow(`
    Usage
      $ circle-step-outputter [options]

    Options
      --baseFileName [Default: "test-output"] 
      --repoSlug [Default: $CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME]
      --buildNum [Default: $CIRCLE_BUILD_NUM]
      --token [Default: $CIRCLE_API_TOKEN]
      --step [Default: "npm test"]

    Examples
      $ circle-step-outputter --repoSlug="artemv/circleci-step-outputter" --buildNum=2
    This will write test-output.json, or test-output0.txt, test-output1.txt ... test-output4.txt if there are 
    multiple actions in the step (usually parallel actions). 
`);

if (!env.CIRCLE_BUILD_NUM && !cli.flags.buildNum) {
  console.log(cli.help);
  process.exit(1);
}
circleStepOutputter(cli.flags);
