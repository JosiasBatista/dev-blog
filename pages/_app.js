import Script from 'next/script';
import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script id="Adsense-id" data-ad-client="ca-pub-7346360878393267"  async strategy="afterInteractive"
        onError={ (e) => { console.error('Script failed to load', e) }}src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />
      <Component {...pageProps} />;
    </>
  )
}