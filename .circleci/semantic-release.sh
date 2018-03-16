#!/bin/bash

if [ "${CIRCLE_PROJECT_USERNAME}" == "artemv" ] && [ "${CIRCLE_BRANCH}" == "master" ]; then
  (npx semantic-release) || echo "publishing failed"
fi
