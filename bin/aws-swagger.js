#!/usr/bin/env node

const { parser } = require('../node/parse-javascript-api')
const args = require('minimist')(process.argv.slice(2));

console.log(args)

parser.build()
