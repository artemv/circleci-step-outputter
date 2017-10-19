const axios = require('axios');
var child_process = require('child_process');

const env = process.env;

function findStep(steps, stepId) {
  let step = steps.find(s => s.name.includes(stepId));
  if (!step) {
    throw new Error(`You specified invalid step identifier, "${stepId}". ` +
      `Steps available in build: ${JSON.stringify(steps.map(s => s.name))}`);
  }
  return step;
}

function unzipFile(gzFileName, jsonFileName) {
  return child_process.execSync(`gunzip --stdout "${gzFileName}" > "${jsonFileName}"`).toString('utf8').trim()
}

function writeResponseMessagesToFile(messages, baseFilename) {
  console.log('writeResponseToFile', messages, baseFilename);
  return Promise.all(messages.map(m => {
    let jsonFileName = `${baseFilename}${messages.length > 1 ? i : ''}.json`;
    console.log(`File ${jsonFileName} written`);
    return jsonFileName;
  }))
}

function dumpOutput(outputUrl, baseFilename, stepSubIndex) {
  baseFilename = `${baseFilename}${stepSubIndex ? stepSubIndex : ''}`;
  return axios
    .get(outputUrl)
    .then(response => writeResponseMessagesToFile(response.data.map(i => i.message), baseFilename))
    .catch(error => {
      console.log(error);
    });
}

function dumpOutputs(actions, baseFileName) {
  return Promise.all(actions.map(action => dumpOutput(action.output_url, baseFileName, actions.length > 1 ? action.index : null)));
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
