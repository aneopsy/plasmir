const PlasmaClient = require('./src/client')
const PlasmaOperator = require('./src/operator')
const providers = require('./src/providers/index')

PlasmaClient.operator = PlasmaOperator
PlasmaClient.providers = providers

module.exports = PlasmaClient
