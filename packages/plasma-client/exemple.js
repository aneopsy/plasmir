const PlasmaNode = require('./index')

;(async function() {
  const node = new PlasmaNode({ plasmaChainName: 'I <3 Plasma' })
  await node.start()
  console.log(await node.core.services.operator.getNextBlock())
})()
