import { stellarNetworks, } from '../foss/stellar-networks.js' // {{{1

async function setup (state, setState) { // {{{1
  if (!state.connected) {
    return;
  }
  console.log('setup start', state)
  const fapi = window.freighterApi
  let account
  return await fapi.getPublicKey().then(pk => { 
    account = pk 
    return fapi.getNetwork();
  }).then(name => {
    let network = stellarNetworks().filter(v => v.name == name)[0].id
    setState(p => Object.assign({}, p, { account, network }))
  });
}

function teardown (state, setState) { // {{{1
  console.log('teardown start', state)
}

export { setup, teardown, } // {{{1

