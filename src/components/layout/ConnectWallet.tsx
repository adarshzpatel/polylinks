import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSigner,
  useSignMessage,
} from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import Button from "@components/ui/Button";
import { FiCopy } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";
import Tooltip from "@components/ui/Tooltip";

const ConnectWallet: React.FC = () => {
  const { data: session, status } = useSession();
  const { data: signer } = useSigner();
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
      return;
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

  const address = session?.user?.address.toString();

  return (
    <div className="flex items-center gap-4 ">
      <Link href={"/dashboard"}>
        <Button>Go to dashboard </Button>
      </Link>
      {!session && !signer && (
        <Button variant="primary" onClick={handleAuth}>
          Connect Wallet
        </Button>
      )}
      {session && signer && (
        <div className="items-center justify-center flex gap-4">
          <Tooltip content="Copy Address">
            <Button variant="success" className="flex items-center  gap-3">
              {address?.slice(0, 4) + "..." + address?.slice(-5, -1)}
              <span>
                <FiCopy className="h-5 w-5" />
              </span>
            </Button>
          </Tooltip>
          <Tooltip content="Disconnect">
            <Button
              variant="danger"
              onClick={handleDisconnect}
              className="!p-2"
            >
              <TbLogout className="h-6 w-6" />
            </Button>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
