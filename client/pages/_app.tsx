import type { AppProps } from 'next/app'
import '../styles/globals.css'; 
import { SessionProvider } from "next-auth/react"
import { Head } from 'next/document';

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}




