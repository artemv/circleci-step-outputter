const axios = require('axios');
const fs = require('fs');

const env = process.env;

function findStep(steps, stepId) {
  let step = steps.find(s => s.name.includes(stepId));
  if (!step) {
    throw new Error(`You specified invalid step identifier, "${stepId}". ` +
      `Steps available in build: ${JSON.stringify(steps.map(s => s.name))}`);
  }
  return step;
}

function writeResponseMessagesToFile(messages, baseFilename) {
  console.log('writeResponseMessagesToFile', messages.length, baseFilename);
  return Promise.all(messages.map((message, idx) => {
    let txtFileName = `${baseFilename}${messages.length > 1 ? idx : ''}.txt`;

    return new Promise((resolve, reject) => {
      fs.writeFile(txtFileName, message, function(err) {
        if (err) {
          reject(err);
        }

        console.log(`File ${txtFileName} written`);
        resolve(txtFileName);
      });
    });
  }))
}

function dumpOutput(outputUrl, baseFilename) {
  console.log(`querying "${outputUrl}" for step output(s)`);
  return axios
    .get(outputUrl)
    .then(response => writeResponseMessagesToFile(response.data.map(i => i.message), baseFilename))
    .catch(error => {
      console.log(error);
    });
}

function dumpOutputs(actions, baseFileName) {
  return Promise.all(actions.map(action => dumpOutput(action.output_url,
    `${baseFileName}${actions.length > 1 ? action.index : ''}`)));
}

function getBuildMetadata(url, {baseFileName, step}) {
  return axios
    .get(url)
    .then(response => findStep(response.data.steps, step))
    .then(stepData => dumpOutputs(stepData.actions, baseFileName))
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      console.log(error.message);
    });
}

function main(opts = {}) {
  opts = Object.assign({
    baseFileName: 'test-output',
    repoSlug: `${env.CIRCLE_PROJECT_USERNAME}/${env.CIRCLE_PROJECT_REPONAME}`,
    buildNum: env.CIRCLE_BUILD_NUM,
    token: env.CIRCLE_API_TOKEN,
    step: 'npm test'
  }, opts);

  let url = `https://circleci.com/api/v1.1/project/github/${opts.repoSlug}/${opts.buildNum}`;
  console.log(`querying "${url}${(opts.token ? '?circle-token=YOUR_TOKEN' : '')}" for meta`);
  url = url + `?circle-token=${opts.token}`;
  return getBuildMetadata(url, {baseFileName: opts.baseFileName, step: opts.step});
}

module.exports = main;
