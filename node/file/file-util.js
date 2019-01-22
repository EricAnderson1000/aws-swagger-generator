'use strict'

const fs   = require('fs')
const path = require('path')

async function findApiFiles(startPath, filter, exclude) {

	if ( ! fs.existsSync(startPath) ){
		throw "No Directory " + startPath
	}

	let files = fs.readdirSync(startPath)
	const found = []

	files.forEach( async file => {
		const filename = path.join(startPath, file);
		const stat = fs.lstatSync(filename);

		if (stat.isDirectory()) {
			const result = await findApiFiles(filename, filter, exclude)
			if (result && result.length > 0) {
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
	findApiFiles,
	contains,
}