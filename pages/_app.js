import '../styles/globals.css'
import {Provider} from "react-redux";
import store from "../public/src/app/Store";
import NextNProgress from 'nextjs-progressbar';





function MyApp({ Component, pageProps }) {


  return (
      <Provider store={store}>
          <NextNProgress />
        <Component {...pageProps} />
      </Provider>
  )
}

export default MyApp
