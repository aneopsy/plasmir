const PlasmaNode = require('./index')

;(async function() {
  const node = new PlasmaNode({ plasmaChainName: 'I <3 Plasma' })
  console.log('first')
  await node.start()
  console.log('deux')
  console.log('lol', await node.operator)
})()
