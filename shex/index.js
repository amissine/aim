function setup (state) {
  console.dir({ setup: true, state, }, { depth: null, })
  if (!state.connected) {
    return;
  }
  const fapi = window.freighterApi
  fapi.getPublicKey().then(pk => console.log('pk', pk))
  fapi.getNetwork().then(network => console.log('network', network))
}

function teardown (state) {
  console.dir({ teardown: true, state, }, { depth: null, })
}

export { setup, teardown, }
