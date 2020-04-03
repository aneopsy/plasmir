const ethers = require('ethers')
const Web3 = require('web3')
const path = require('path')
const colors = require('colors') // eslint-disable-line no-unused-vars
const plasmaRegistryCompiled = require('@plasmir/plasma-contracts')
  .plasmaRegistryCompiled
const serializerCompiled = require('@plasmir/plasma-contracts')
  .serializerCompiled
const plasmaChainCompiled = require('@plasmir/plasma-contracts')
  .plasmaChainCompiled
const getAccount = require('./utils.js').getAccount
const appRoot = require('../src/utils.js').appRoot
const configFile = process.env.CONFIG
  ? process.env.CONFIG
  : path.join(appRoot.toString(), 'config.json')
const readConfigFile = require(appRoot + '/src/utils.js').readConfigFile

;(async function() {
  console.log('\n#----------------PLASMA-DEPLOYMENT----------------#'.rainbow)
  const config = readConfigFile(configFile)
  const account = await getAccount()
  if (account === null || account === undefined) {
    return
  }
  console.log('\nPlasma Operator Address: '.green, account.address.green)
  console.log(config)
  var provider = new ethers.providers.Web3Provider(
    new Web3.providers.HttpProvider(config.web3HttpProvider)
  )
  let wallet = new ethers.Wallet(account.privateKey, provider)

  let plasmaSerializerCt = new ethers.ContractFactory(
    serializerCompiled.abi,
    serializerCompiled.bytecode,
    wallet
  )
  let plasmaChainCt = new ethers.ContractFactory(
    plasmaChainCompiled.abi,
    plasmaChainCompiled.bytecode,
    wallet
  )
  let plasmaRegistryCt = new ethers.ContractFactory(
    plasmaRegistryCompiled.abi,
    plasmaRegistryCompiled.bytecode,
    wallet
  )

  let plasmaSerializerCtContract = await plasmaSerializerCt.deploy()
  let plasmaChainCtContract = await plasmaChainCt.deploy()
  let plasmaRegistryCtContract = await plasmaRegistryCt.deploy()

  await plasmaSerializerCtContract.deployed()
  console.log(
    'Plasma Serializer: '.yellow,
    plasmaSerializerCtContract.address.yellow
  )

  await plasmaChainCtContract.deployed()
  console.log('Plasma Chain: '.yellow, plasmaChainCtContract.address.yellow)

  await plasmaRegistryCtContract.deployed()
  console.log(
    'Plasma Registry: '.yellow,
    plasmaRegistryCtContract.address.yellow
  )

  await plasmaRegistryCtContract.initializeRegistry(
    plasmaChainCtContract.address,
    plasmaSerializerCtContract.address
  )
  console.log('Plasma is ready!'.white)
})()
