#!/bin/bash

cd dto
yarn install --frozen-lockfile

cd ../server
yarn install --frozen-lockfile
yarn start:dev &

cd ../client
yarn install --frozen-lockfile
yarn dev &