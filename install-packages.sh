#!/bin/bash

cd dto
yarn install --frozen-lockfile

cd ../server
yarn install --frozen-lockfile

cd ../client
yarn install --frozen-lockfile
