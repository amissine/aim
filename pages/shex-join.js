import Head from 'next/head' // {{{1
import Link from 'next/link';
import Script from 'next/script'
import { useEffect, useState } from 'react'
import styles from './shex.module.css'
import { setup, teardown } from '../shex'

const addWallet = // {{{1
<div>
  Add{' '}<a href="https://www.freighter.app/" target="_blank">Freighter</a>{' '}
  to your browser, set it up and add an account. Then come back and reload this page.
</div>

function walletAdded (network, account) { // {{{1
  return (
<div>
  <code>
    Connected to {network} account {account}.
  </code>
</div>
  );
}

export default function Join() { // {{{1
  const [q, setQ] = useState({ count: 0, }) // TODO remove count when done debugging {{{2
  useEffect(_ => setQ(p => Object.assign({}, p, { // connected, userAgent {{{3
    connected: window.freighterApi?.isConnected(),
    userAgent: window.navigator.userAgent,
  })), [q.connected, q.userAgent])
  useEffect(_ => { // connected, network, sdk, server {{{3
    setup(q, setQ)
    //return _ => teardown(q, setQ);
  }, [q.connected, q.network, q.sdk, q.server])
  // }}}3
  return ( // {{{2
  <>
    <Head>
      <title>Join Stellar HEX</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Script
      onError={e => setQ(p => Object.assign({}, p, { count: ++p.count, error: e }))}
      onLoad={_ => {
        let connected = window.freighterApi.isConnected()
        setQ(p => Object.assign({}, p, { count: ++p.count, connected, }))
      }}
      onReady={_ => {
        let connected = window.freighterApi.isConnected()
        setQ(p => Object.assign({}, p, { count: ++p.count, connected, }))
      }}
      src="https://cdnjs.cloudflare.com/ajax/libs/stellar-freighter-api/1.3.1/index.min.js"
      strategy="lazyOnload"
    />
    <Script
      onError={e => setQ(p => Object.assign({}, p, { count: ++p.count, error: e }))}
      onLoad={_ => !!window.StellarSdk && !q.sdk &&
        setQ(p => Object.assign({}, p, { count: ++p.count, sdk: window.StellarSdk, }))
      }
      onReady={_ => !!window.StellarSdk && !q.sdk &&
        setQ(p => Object.assign({}, p, { count: ++p.count, sdk: window.StellarSdk, }))
      }
      src="https://cdnjs.cloudflare.com/ajax/libs/stellar-sdk/10.4.0/stellar-sdk.js"
      strategy="lazyOnload"
    />
    <div className={styles.container}>
      <div className={styles.title}>
        {
          q.error ? <code>{JSON.stringify(q)}</code>
          : q.userAgent?.includes('Mobile') ? 'Unsupported mobile device' // TODO support
          : q.connected ? //: q.count < 3 ? <code>{JSON.stringify(q)}</code>
            q.account ? 
              q.loaded ? <code>{JSON.stringify(q.loaded.balances.length)}</code>
              : walletAdded(q.network.id, q.account) 
            : 'OK'
          : addWallet
        }
      </div>
    </div>
  </>
  ) // }}}2
}
// TODO hint: use https://www.npmjs.com/package/stellar-hd-wallet
