'use strict'

const yaml = require('js-yaml')
const fs   = require('fs')
const { findApiFiles } = require('../file/file-util')

const FILE_FILTER = 'swagger-api.yml'
const FILE_EXCLUDE = 'base.swagger-api.yml'


async function build(path) {

	console.log('Processing.....')
	const workingDirectory = fs.realpathSync(path)
	const baseFiles = await findApiFiles(workingDirectory, FILE_EXCLUDE)
	if (baseFiles == null || baseFiles.length == 0 || baseFiles > 1) {
		throw 'Invalid number of \'base.swagger-api.yml\' files -- ' + baseFiles
	}

	//Load in Base YML file if available
	const file = fs.readFileSync(baseFiles[0], 'utf8')
	let doc = yaml.safeLoad(file)


	//Find all files that end with swagger-api.yml and add to Javascript Object
	const apiFiles = await findApiFiles(workingDirectory, FILE_FILTER, FILE_EXCLUDE)
	console.log('Found Files', apiFiles)

	apiFiles.forEach( file => {
		const ymlFile = fs.readFileSync(file, 'utf8')
		const ymlObject = yaml.safeLoad(ymlFile)

		// const ymlOutput = yaml.safeDump(ymlObject)
		// console.log(ymlOutput)

		doc = {
			...doc,
			...ymlObject
		}
	})

	// let docString = JSON.stringify(doc, null, "\t")
	// const result = docString.replace(/\"([^(\")"]+)\":/g,"$1:");  //This will remove all the quotes for the keys

	const ymlOutput = yaml.safeDump(doc)
	console.log(ymlOutput)


	fs.writeFile('./swagger-new.yml', ymlOutput, function (err) {
		if (err) {
			return console.log(err);
		}
		console.log('Complete')
	})
}


module.exports = {
	build,
}