import type { AppProps } from "next/app";
import "../styles/globals.css";
import { createClient, configureChains, chain, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import {
  getDefaultWallets,
  // RainbowKitProvider,
  // darkTheme,
  // Theme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { SessionProvider } from "next-auth/react";

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

// const customDarkTheme = darkTheme({
//   accentColor: "#8b5cf6",
//   accentColorForeground: "white",
//   borderRadius: "medium",
//   overlayBlur: "small",
// });

// const customTheme: Theme = {
//   ...customDarkTheme,
//   colors: {
//     ...customDarkTheme.colors,
//     connectButtonBackground: "rgba(63, 63, 70, 0.15)",
//   },
// };

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        {/* <RainbowKitProvider coolMode theme={customTheme} chains={chains}> */}
          <Component {...pageProps} />
        {/* </RainbowKitProvider> */}
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;
