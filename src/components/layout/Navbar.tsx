import Button from "@components/ui/Button";
import axios from "axios";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import ConnectWallet from "./ConnectWallet";
import Logo from "./Logo";

type Props = {};

const Navbar = (props: Props) => {
  const { address } = useAccount();

  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();

  const handleAuth = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    if (!window.ethereum) {
      alert("Please install Metamask wallet");
      return
    }
    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector(),
      chainId: 80001,
    });

    const userData = { address: account, chain: chain.id, network: "evm" };

    const { data } = await axios.post("/api/auth/request-message", userData, {
      headers: {
        "content-type": "application/json",
      },
    });

    const message = data.message;

    const signature = await signMessageAsync({ message });

    // redirect user after success authentication to '/user' page
    const res = await signIn("credentials", {
      message,
      signature,
      redirect: false,
      callbackUrl: "/dashboard",
    });
    /**
     * instead of using signIn(..., redirect: "/user")
     * we get the url from callback and push it to the router to avoid page refreshing
     */
    push("/dashboard");
  };

  const handleDisconnect = async () => {
    try {
      await disconnectAsync()
        .then(() => signOut())
        .then(() => alert("Disconnected"));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="p-8 sticky backdrop-blur-xl ">
      <nav className="flex max-w-screen-lg mx-auto justify-between">
        <Logo />
        {/* <Button loading variant="primary">Connect Wallet</Button> */}
        <button onClick={handleDisconnect}>{address}</button>
        {!address && (
          <Button variant="primary" onClick={handleAuth}>
            Connect
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
