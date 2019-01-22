'use strict'

const yaml = require('js-yaml')
const fs   = require('fs')

async function parse() {

	const file = fs.readFileSync('./sample.yml', 'utf8')
	const doc = yaml.safeLoad(file)

	let docString = JSON.stringify(doc, null, "\t")
	const result = docString.replace(/\"([^(\")"]+)\":/g,"$1:");  //This will remove all the quotes for the keys

	console.log(result)
}

parse()

