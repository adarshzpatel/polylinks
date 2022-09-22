import React from "react";
import type { AppProps } from "next/app";
import Router from "next/router";
import "../styles/globals.css";
import { createClient, configureChains, chain, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
  Theme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import AppContainer from "@components/layout/AppContainer";
import Loading from "@components/ui/Loading";

const { provider, webSocketProvider, chains } = configureChains(
  [chain.polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
  // added connectors from rainbowkit
  connectors,
});

const customDarkTheme = darkTheme({
  accentColor: "#8b5cf6",
  accentColorForeground: "white",
  borderRadius: "medium",
  overlayBlur: "small",
});

const customTheme: Theme = {
  ...customDarkTheme,
  colors: {
    ...customDarkTheme.colors,
    connectButtonBackground: "rgba(63, 63, 70, 0.15)",
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("finished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <>
      <WagmiConfig client={client}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <RainbowKitProvider coolMode theme={customTheme} chains={chains}>
            <Toaster />
            <AppContainer>
              {loading ? <Loading /> : <Component {...pageProps} />}
            </AppContainer>
          </RainbowKitProvider>
        </SessionProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
