'use strict'

const yaml = require('js-yaml')
const fs   = require('fs')
const path = require('path')

const FILE_FILTER = 'swagger-api.js'
const FILE_EXCLUDE = 'common.swagger-api.js'

async function run() {

	console.log('Processing.....')

	//Load in Base YML file
	const file = fs.readFileSync('/Users/ericanderson/Development/opensource/aws-swagger-generator/example/swager/swagger_base.yml', 'utf8')
	var doc = yaml.safeLoad(file)

	//Find all files that end with swagger-api.js and add to Javascript Object
	const apiFiles = await findApiFiles('/Users/ericanderson/Development/opensource/aws-swagger-generator', FILE_FILTER, FILE_EXCLUDE)
	apiFiles.forEach( file => {
		const { API } = require(file)
		doc = {
			...doc,
			...API
		}
	})

	const ymlOutput = yaml.safeDump(doc)
	console.log('--- New File --- \n', ymlOutput, '\n--------')

}

function removeQuotes(doc) {

	var docString = JSON.stringify(doc, null, "\t")
	return docString.replace(/\"([^(\")"]+)\":/g,"$1:");  //This will remove all the quotes

}

async function findApiFiles(startPath, filter, exclude) {

	if ( ! fs.existsSync(startPath) ){
		console.log("No Directory",startPath)
		return
	}

	var files = fs.readdirSync(startPath);
	const found = []

	files.forEach( async file => {
		const filename = path.join(startPath, file);
		const stat = fs.lstatSync(filename);

		if (stat.isDirectory()) {
			const result = await findApiFiles(filename, filter)
			if (result) {
				found.push(...result)
			}
		}
		else if (filename.indexOf(filter) >= 0 && filename.indexOf(exclude) <=0) {
			found.push(filename)
		}
	})

	return found
}