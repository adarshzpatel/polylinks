import React from "react";
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
import Button from "@components/ui/Button";
import { FiCopy } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";
import Tooltip from "@components/ui/Tooltip";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const ConnectWallet: React.FC = () => {
  const { data: session, status } = useSession();
  const { data: signer } = useSigner();
  const { disconnectAsync } = useDisconnect();

  const { openConnectModal } = useConnectModal();
  const handleDisconnect = async () => {
    try {
      await disconnectAsync()
        .then(() => signOut())
        .then(() => alert("Disconnected"));
    } catch (err) {
      console.log(err);
    }
  };

const address = session?.address;
  return (
    <div className="flex items-center gap-4 ">
      <Link href={"/dashboard"}>
        <Button>Go to dashboard </Button>
      </Link>
      <div className="items-center justify-center flex gap-4">
        {!session && (
          <Button variant="primary" onClick={openConnectModal}>
            Connect Wallet
          </Button>
        )}
        {session && (
          <>
            <Tooltip content="Copy Address">
              <Button variant="success" className="flex items-center  gap-3">
                {address?.slice(0, 4) + "..." + address?.slice(-5, -1)}
                <div>
                  <FiCopy className="h-5 w-5" />
                </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default ConnectWallet;
