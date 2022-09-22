import React, { useState } from "react";
import Button from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { chain, useAccount, useContract, useProvider } from "wagmi";
import {
  POLYLINK_ABI,
  POLYLINK_CONTRACT_ADDRESS,
} from "smart-contract/contract";
import axios from "axios";
import clsx from "clsx";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

type Props = {
  closeModal: any;
};

const validName = new RegExp("^[a-z0-9]");

const PRICE = 0.5;
const ClaimInput = ({ closeModal }: Props) => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const provider = useProvider({ chainId: chain.polygonMumbai.id });
  const [buttonText, setButtonText] = useState<string>("CLAIM LINK");
  const { isConnected, address } = useAccount();
  const polyLinkContract = useContract({
    addressOrName: POLYLINK_CONTRACT_ADDRESS,
    contractInterface: POLYLINK_ABI,
    signerOrProvider: provider,
  });
  // check if the name is available or taken

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const _name = e.target.value.toLowerCase();
    setName(_name.replaceAll(" ", "").replaceAll("/", ""));
    if (_name === "") {
      setError("This field cannot be empty");
      return;
    }
    setError("");

    console.log(validName.test(_name));
    checkIfAvailable(_name);
  };

  const sendMatic = () => {};

  const handleClaim = async () => {
    setLoading(true);
    setButtonText("Minting your link...");
    try {
      if (!isConnected) throw new Error("Wallet Not Connected");
      const mintReq = await axios.post("/api/mint", {
        name,
        claimAddress: address,
      });
      console.log(mintReq.data);
      setButtonText("Mint Successfull");
      toast.success("Link Claimed successfully")
      closeModal();
    } catch (err) {
      toast.success("Something went wrong")
      console.error(err);
    }
    setLoading(false);
  };

  const checkIfAvailable = async (_name: string) => {
    setLoading(true);
    setButtonText("CHECKING AVAILABILITY");
    try {
      const res = await polyLinkContract.namesToOwners(_name);
      console.log(res);
      setIsAvailable(true);
      if (res !== "0x0000000000000000000000000000000000000000")
        setIsAvailable(false);
    } catch (err) {
      console.log(err);
    }
    console.log(isAvailable);
    setButtonText("CLAIM LINK");
    setLoading(false);
  };

  return (
    <div className="flex flex-col  gap-4 ">
      <Input
        placeholder="Enter your dream name"
        value={name}
        onChange={handleChange}
        pattern="[a-z0-9]"
        minLength={1}
        maxLength={12}
        error={error}
      />
      <p className="text-xs text-gray-600 ">
        Only alphanumeric characters allowed ( a-z & 0-9 )
      </p>
      {name && !loading && (
        <div
          className={clsx(
            {
              "text-green-500 bg-green-600/10": isAvailable,
              "text-red-400 bg-red-700/10": !isAvailable,
            },
            "text-sm p-2 px-4 rounded-md"
          )}
        >
          {isAvailable
            ? `Available for ${PRICE} MATIC`
            : "Already taken , try something else"}
        </div>
      )}
      {isAvailable && (
        <Button
          loading={loading}
          variant="primary"
          disabled={name === '' || error !== "" || loading}
          onClick={() => handleClaim()}
          className="!py-2 flex items-center justify-center uppercase "
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default ClaimInput;
