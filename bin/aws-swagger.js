#!/usr/bin/env node

const { buildJS } = require('../node/javascript/parse-javascript-api')
const { buildYML } = require('../node/yml/parse-yml-api')

const MODE_YML = 'yml'
const MODE_JS = 'javascript'


const args = require('minimist')(process.argv.slice(2))

console.log('Arguments:', args)

if (args.mode === MODE_YML) {
	buildYML()
	return
}

if (args.mode === MODE_JS) {
	buildJS()
	return
}

throw 'Mode ' + args.mode ' is unknown'