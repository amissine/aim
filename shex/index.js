import { stellarNetworks, } from '../foss/stellar-networks.js' // {{{1
import { Account, } from '../foss/stellar-account.js'

async function setup (state, setState) { // {{{1
  if (!state.connected) { // {{{2
    return;
  } // }}}2
  console.log('setup', state)
  if (state.network) { // {{{2
    if (!state.sdk) { // {{{3
      return;
    } // }}}3
    if (state.server) {
      /* // {{{3
      await state.server.accounts().accountId(state.account).call().then(found => {
        setState(p => Object.assign({}, p, { found }))
      })
      */
      await state.server.loadAccount(state.account).then(async loaded => { // {{{3
        setState(p => Object.assign({}, p, { loaded }))
        let user = new Account(
          { loaded, network: state.network, server: state.server }
        )
        console.log('user loaded', user)

        if (user.trusts(state.network.hex.assets)) {
          return;
        }
        console.log('TODO make user trust HEX assets')

        for (let asset of state.network.hex.assets) {
          await user.trust(asset).sign(window.freighterApi)
            .then(xdr => user.submit({ xdr })).catch(e => console.error(e))
        }
      })
      return; // }}}3
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

