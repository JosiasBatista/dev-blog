import Script from 'next/script';
import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  )
}