import '../styles/globals.css'
import '../styles/message.css'
import '../styles/logo.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
