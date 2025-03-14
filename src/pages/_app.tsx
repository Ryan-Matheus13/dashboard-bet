import "@/styles/globals.css";
import { ReactElement, ReactNode } from "react";
import { AppProps } from "next/app";
import { NextPage } from "next";
import { Provider } from "react-redux";
import { store } from "../store";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
    <Provider store={store}>
      <CacheProvider value={clientSideEmotionCache}>
        <Component {...pageProps} />
      </CacheProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </Provider>
  );
}
