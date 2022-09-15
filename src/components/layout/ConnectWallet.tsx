import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useSigner } from "wagmi";

const ConnectWallet: React.FC = () => {
  const { data: signer } = useSigner();

  return (
    <div className="flex items-center gap-4 ">
      {signer && (
        <Link href={"/dashboard"}>
          <div className="px-4 hover:bg-gray-800/50 text-gray-400 hover:text-white duration-200 ease-out rounded-lg cursor-pointer py-2 flex items-center ">
            Go to dashboard{" "}
          </div>
        </Link>
      )}
      <ConnectButton showBalance={false} />
    </div>
  );
};

export default ConnectWallet;
