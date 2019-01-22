'use strict'

const { OPTIONS } = require('../common.swagger-api')

/**
 * See https://api.nasa.gov/
 *
 * @type {{path: string}}
 */

const API = {
	paths: {
		'/': {
			get: {
				consumes: [
					"application/json"
				],
				produces: [
					"application/json"
				],
				responses: {
					200: {
						description: "200 response",
						schema: {
							$ref: "#/definitions/Empty"
						},
						headers: {
							'Access-Control-Allow-Origin': {
								type: "string"
							}
						}
					}
				},
				security: [
					{
						ApiJwtAuthorizer: []
					}
				],
				'x-amazon-apigateway-integration': {
					responses: {
						default: {
							statusCode: "200",
							responseParameters: {
								'method.response.header.Access-Control-Allow-Origin': "'*'"
							}
						}
					},
					requestTemplates: {
						'application/json': "{\n  \authPrincipalId\: \"$context.authorizer.principalId\",\n  \authTenantId\: \"$context.authorizer.companyId\",\n  \jwt\: \"$context.authorizer.jwt\",\n  \statusCode\: 200\n}"
					},
					passthroughBehavior: "when_no_match",
					type: "mock"
				}
			},
			...OPTIONS
		}
	}
}

module.exports = {
	API
}
