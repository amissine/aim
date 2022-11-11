import Head from 'next/head'
import Link from 'next/link';
import Script from 'next/script'
import { useEffect, useState } from 'react'
import styles from './shex.module.css'

export default function Home() {
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
    <code>{JSON.stringify(q)}</code>
    <div className={styles.container}>
      <p>
        {q.userAgent?.includes('Mobile') ? 'Unsupported mobile device' : 'OK'}
      </p>
    </div>
  </>
  )
}
