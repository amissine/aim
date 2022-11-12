import Head from 'next/head' // {{{1
import Link from 'next/link';
import Script from 'next/script'
import { useEffect, useState } from 'react'
import styles from './shex.module.css'

const addWallet = // {{{1
<div>
  Add{' '}<a href="https://www.freighter.app/" target="_blank">Freighter</a>{' '}
  to your browser, set it up and add an account. Then come back and reload this page.
</div>

export default function Home() { // {{{1
  const [q, setQ] = useState({ count: 0, })
  useEffect(_ => setQ(p => Object.assign({}, p, {
    connected: window.freighterApi?.isConnected(),
    userAgent: window.navigator.userAgent,
  })), [q.userAgent])
  return (
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
      src="https://cdnjs.cloudflare.com/ajax/libs/stellar-freighter-api/1.1.2/index.min.js"
      strategy="lazyOnload"
    />
    <div className={styles.container}>
      <div className={styles.title}>
        {
          q.error ? <code>{JSON.stringify(q.error)}</code>
          : q.userAgent?.includes('Mobile') ? 'Unsupported mobile device' // TODO support
          : q.connected ? 'OK' //: q.count < 3 ? <code>{JSON.stringify(q)}</code>
          : addWallet
        }
      </div>
    </div>
  </>
  )
}
