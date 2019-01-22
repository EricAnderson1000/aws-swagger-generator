#!/usr/bin/env node

const { build } = require('../node/parse-javascript-api')
const args = require('minimist')(process.argv.slice(2))

console.log('Arguments:', args)

build()
