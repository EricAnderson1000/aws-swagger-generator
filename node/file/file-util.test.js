'use strict'

const fileUtil = require('./file-util')

describe('Parse YML', () => {

	test('Test Contains', async () => {

		const result1 = fileUtil.contains('/Users/ericanderson/Development/opensource/aws-swagger-generator/example/yml/base.swagger-api.yml', 'base.swagger-api.yml')
		expect(result1).toBe(true)

		const result2 = fileUtil.contains('/Users/ericanderson/Development/opensource/aws-swagger-generator/example/yml/base.swagger-api.yml', 'base.swagger-api.js')
		expect(result2).toBe(false)

	})
})
