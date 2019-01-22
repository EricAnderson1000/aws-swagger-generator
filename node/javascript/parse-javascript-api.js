'use strict'

const yaml = require('js-yaml')
const fs   = require('fs')
const path = require('path')
const readdir = require('readdir-absolute');

const { BASE_SWAGGER } = require('../constants.js')
const FILE_FILTER = 'swagger-api.js'
const FILE_EXCLUDE = 'common.swagger-api.js'

async function build(baseSwagger) {

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

async function findApiFiles(startPath, filter, exclude) {

	if ( ! fs.existsSync(startPath) ){
		console.log("No Directory",startPath)
		return
	}

	let files = fs.readdirSync(startPath)
	const found = []

	files.forEach( async file => {
		const filename = path.join(startPath, file);
		const stat = fs.lstatSync(filename);

		if (stat.isDirectory()) {
			const result = await findApiFiles(filename, filter, exclude)
			if (result) {
				found.push(...result)
			}
		}
		else if (contains(file, filter) && ( ! contains(file, exclude))) {
			found.push(filename)
		}
	})

	return found
}

function contains(filename, value) {
	return (filename.indexOf(value) >= 0)
}

module.exports = {
	build,
	findApiFiles,
}