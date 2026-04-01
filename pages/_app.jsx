import Head from "next/head";
import PageLoading from "../components/widgets/PageLoading";
import "../styles/globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { attributes as settings } from "../content/settings.md";
import AuthWrapper from "../components/listings/AuthWrapper";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{settings.siteName}</title>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      <AuthWrapper>
        <PageLoading />
        <Component {...pageProps} />
        <Analytics />
      </AuthWrapper>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=AW-11512447042"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11512447042', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

export default MyApp;
