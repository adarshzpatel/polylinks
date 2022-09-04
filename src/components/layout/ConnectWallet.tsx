import { ConnectButton } from "@rainbow-me/rainbowkit";
import { signIn, useSession } from "next-auth/react";
import { useAccount, useSignMessage, useNetwork } from "wagmi";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Button from "@components/ui/Button";
import { FiChevronDown } from "react-icons/fi";
import { HiOutlineChevronDown } from "react-icons/hi";

const ConnectWallet: React.FC = () => {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const { status } = useSession();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const userData = { address, chain: chain?.id, network: "evm" };

      const { data } = await axios.post("/api/auth/request-message", userData, {
        headers: {
          "content-type": "application/json",
        },
      });

      const message = data.message;

      const signature = await signMessageAsync({ message });

      // redirect user after success authentication to '/user' page
      const { url }: any = await signIn("credentials", {
        message,
        signature,
        redirect: false,
        callbackUrl: "/user",
      });
      /**
       * instead of using signIn(..., redirect: "/user")
       * we get the url from callback and push it to the router to avoid page refreshing
       */
      push(url);
    };
    if (status === "unauthenticated" && isConnected) {
      handleAuth();
    }
  }, [status, isConnected]);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button variant="primary" onClick={openConnectModal}>
                    Connect Wallet
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button
                    variant="danger"
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </Button>
                );
              }
              return (
                <div className="flex gap-4">
                  <button
                    onClick={openChainModal}
                    className="flex items-center hover:ring-2 ring-gray-600  gap-2 bg-gray-800  duration-300 ease-out py-1.5 px-3 rounded-md"
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                        }}
                        className="rounded-full  overflow-hidden"
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            className="h-6 w-6"
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                    <HiOutlineChevronDown className="h-5 w-5" />
                  </button>
                  <button
                    className="flex font-medium hover:ring-2 ring-gray-600 items-center  bg-gray-800 duration-300 ease-out p-1 rounded-md"
                    onClick={openAccountModal}
                    type="button"
                  >
                    <span className="mx-2 ">
                      {account.displayBalance
                        ? ` ${account.displayBalance}`
                        : ""}
                    </span>
                    <span className=" border-l-2   flex gap-1 border-gray-600 items-center  px-2  text-white">
                      {account?.ensAvatar}
                      {account.ensName ? account.ensName : account.displayName}
                      <HiOutlineChevronDown className="h-5 w-5" />
                    </span>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectWallet;
