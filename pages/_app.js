import '../styles/globals.css'
import {Provider} from "react-redux";
import store from "../public/src/app/Store";
import NextNProgress from 'nextjs-progressbar';
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {


  return (
      <Provider store={store}>
          <SessionProvider session={session}>
          <NextNProgress />
        <Component {...pageProps} />
          </SessionProvider>
      </Provider>
  )
}

export default MyApp
