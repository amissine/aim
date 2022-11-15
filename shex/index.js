import { stellarNetworks, } from '../foss/stellar-networks.js' // {{{1

async function setup (state, setState) { // {{{1
  if (!state.connected) { // {{{2
    return;
  }
  console.log('setup start', state)
  if (state.network) { // {{{2
    if (!state.sdk) {
      return;
    }
    if (state.server) {
      console.log('TODO continue')
      return;
    }
    let server = new state.sdk.Server(state.network.url)
    setState(p => {
      let hex = p.network.hex
      hex.assets = [
        new state.sdk.Asset('ClawableHexa', hex.issuer),
        new state.sdk.Asset('HEXA', hex.issuer),
      ]
      return Object.assign({}, p, { server });
    })
    return;
  }
  const fapi = window.freighterApi // {{{2
  let account
  return await fapi.getPublicKey().then(pk => { 
    account = pk 
    return fapi.getNetwork();
  }).then(name => {
    let network = stellarNetworks().filter(v => v.name == name)[0]
    setState(p => Object.assign({}, p, { account, network }))
  }); // }}}2
}

function teardown (state, setState) { // {{{1
  console.log('teardown start', state)
}

export { setup, teardown, } // {{{1

