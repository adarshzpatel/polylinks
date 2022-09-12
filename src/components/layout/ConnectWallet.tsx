import { ConnectButton } from "@rainbow-me/rainbowkit";
import { signIn, useSession } from "next-auth/react";
import { useAccount, useSignMessage, useNetwork } from "wagmi";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

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
      await signIn("credentials", {
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
    if (status === "unauthenticated" && isConnected) {
      handleAuth();
    }
  }, [status, isConnected]);

  return (
    <div className="flex items-center gap-4 ">
      <Link href={"/dashboard"}>
        <div className="px-4 hover:bg-gray-800/50 text-gray-400 hover:text-white duration-200 ease-out rounded-lg cursor-pointer py-2 flex items-center ">Go to dashboard  </div>
      </Link>
      <ConnectButton showBalance={false} />
    </div>
  );
};

export default ConnectWallet;
