'use strict'

const yaml = require('js-yaml')
const fs   = require('fs')
const { findApiFiles } = require('../file/file-util')


const { BASE_SWAGGER } = require('../constants.js')
const FILE_FILTER = 'swagger-api.js'
const FILE_EXCLUDE = 'common.swagger-api.js'

async function buildJS(baseSwagger) {

	console.log('Processing.....')
	let doc = BASE_SWAGGER

	//Load in Base YML file if available
	if ( baseSwagger ) {
		const file = fs.readFileSync(baseSwagger, 'utf8')
		doc = yaml.safeLoad(file)
		console.log('Found base swagger')
	}

	const workingDirectory = fs.realpathSync('./')

	//Find all files that end with swagger-api.js and add to Javascript Object
	const apiFiles = await findApiFiles(workingDirectory, FILE_FILTER, FILE_EXCLUDE)
	// console.log('Found Files', apiFiles)
	apiFiles.forEach( file => {
		const { API } = require(file)
		doc = {
			...doc,
			...API
		}
	})

	const ymlOutput = yaml.safeDump(doc)
	fs.writeFile('./swagger-new.yml', ymlOutput, function (err) {
		if (err) {
			return console.log(err);
		}
		console.log('Complete')
	})
}

function removeQuotes(doc) {

	let docString = JSON.stringify(doc, null, "\t")
	return docString.replace(/\"([^(\")"]+)\":/g,"$1:");  //This will remove all the quotes
}

module.exports = {
	buildJS,
}