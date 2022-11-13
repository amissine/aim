import { stellarNetworks, } from '../foss/stellar-networks.js'

function setup (state) {
  console.dir({ setup: true, state, }, { depth: null, })
  if (!state.connected) {
    return;
  }
  const fapi = window.freighterApi
  fapi.getPublicKey().then(pk => console.log('pk', pk))
  fapi.getNetwork().then(network => console.log(
    'network', network, stellarNetworks().filter(v => v.name == network)[0]
  ))
}

function teardown (state) {
  console.dir({ teardown: true, state, }, { depth: null, })
}

export { setup, teardown, }
