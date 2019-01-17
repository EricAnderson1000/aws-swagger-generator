'use strict'

const yaml = require('js-yaml')
const fs   = require('fs')

async function run() {

	console.log('Processing.....')

	// Get document, or throw exception on error
	try {

		const file = fs.readFileSync('/Users/ericanderson/Development/opensource/aws-swagger-generator/example/swager/swagger_temp.yml', 'utf8')
		// console.log('--- File ---\n', file, '\n--------')

		var doc = yaml.safeLoad(file)
		var docString = JSON.stringify(doc, null, "\t")

		// var json = '{ "name": "John Smith" }';       //Let's say you got this
		docString = docString.replace(/\"([^(\")"]+)\":/g,"$1:");  //This will remove all the quotes
		console.log(docString);



		const ymlOutput = yaml.safeDump(doc)
		// console.log('--- New File --- \n', file, '\n--------')


	} catch (e) {
		console.log(e);
	}

}

run()