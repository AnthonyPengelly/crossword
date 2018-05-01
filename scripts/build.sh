#!/bin/sh
# Run from project root.
npm install 

if  [ $TRAVIS_BRANCH = "master" ]; then
    ENVIRONMENT=test npm run build
fi

if [ $TRAVIS_BRANCH = "live" ]; then
    ENVIRONMENT=live npm run build
fi