import Head from 'next/head'
import Link from 'next/link';
import Script from 'next/script'
import React from 'react'
import styles from './shex.module.css'

export default function Home() {
  React.useEffect(_ => console.log(
    'React.useEffect', global?.window,
    global?.window && window.freighterApi?.isConnected()
  ))
  return (
  <>
    <Head>
      <title>Join Stellar HEX</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Script
      onError={e => console.error(
        'onError',
        e
      )}
      onLoad={_ => console.log(
        'onLoad',
        global?.window && window.freighterApi.isConnected()
      )}
      onReady={_ => console.log(
        'onReady',
        global?.window && window.freighterApi.isConnected()
      )}
      src="https://cdnjs.cloudflare.com/ajax/libs/stellar-freighter-api/1.1.2/index.min.js"
      strategy="lazyOnload"
    />
    <div className={styles.container}>

    </div>
  </>
  )
}
