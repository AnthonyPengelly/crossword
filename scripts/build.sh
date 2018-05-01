#!/bin/sh
# Run from project root.
npm install 

if [[ $TRAVIS_BRANCH == 'master' ]]
    ENVIRONMENT=test npm run build
fi

if [[ $TRAVIS_BRANCH == 'live' ]]
    ENVIRONMENT=live npm run build
fi