import React, { useState } from "react";
import Button from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { chain, useAccount, useContract, useProvider } from "wagmi";
import {
  POLYLINK_ABI,
  POLYLINK_CONTRACT_ADDRESS,
} from "smart-contract/contract";
import axios from "axios";

type Props = {};


const PRICE = 0.5;
const ClaimInput = (props: Props) => {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const { address, isConnected } = useAccount();
  const provider = useProvider({ chainId: chain.polygonMumbai.id });

  const polyLinkContract = useContract({
    addressOrName: POLYLINK_CONTRACT_ADDRESS,
    contractInterface: POLYLINK_ABI,
    signerOrProvider: provider,
  });
  // check if the name is available or taken

  const isEmpty = name === "";

  const validateInput = (s: string) => {
    const n = s.length;
    const valid = new RegExp("/^[a-z0-9]$/g");
    if (valid.test(s)) {
      setError("Invalid Input");
    }
    setError("");
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
   
    const _name = e.target.value;
    setName(_name);
    checkIfAvailable(_name);
  };

  const handleClaim = async () => {
    setLoading(true);

    try {
      if (!isConnected) throw new Error("Wallet Not Connected");
      const mintReq = await axios.post("/api/mint", {
        name,
        claimAddress: address,
      });
      console.log(mintReq.data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const checkIfAvailable = async (_name: string) => {
    setLoading(true);

    try {
      const res = await polyLinkContract.namesToOwners(_name);
      console.log(res);
      setIsAvailable(true)
      if (res !== "0x0000000000000000000000000000000000000000") setIsAvailable(false);
    } catch (err) {
      console.log(err);
    }
    console.log(isAvailable)
    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Enter your dream name"
          value={name}
          onChange={handleChange}
        />
        <Button
        loading={loading}
         onClick={() => handleClaim()}
          variant="primary"
          className="!py-2 "
        >
          {!loading && "Claim" }
        </Button>
      </div>
      {error !== "" && (
        <span className="text-red-400  font-medium text-sm">{error}</span>
      )}
      <div className="mt-2">
        {!isEmpty &&
          (isAvailable ? (
            <span className="text-green-500 uppercase font-medium text-sm">
              {" "}
              Available for {PRICE} MATIC
            </span>
          ) : (
            <span className="text-red-400 uppercase font-medium text-sm">
              {" "}
              ALREADY TAKEN{" "}
            </span>
          ))}
      </div>
    </div>
  );
};

export default ClaimInput;
