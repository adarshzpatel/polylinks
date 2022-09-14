import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import AppContainer from "./layout/AppContainer";

type Props = {};

const SignerNotFound = (props: Props) => {
  return (
    <AppContainer>
      <div className="page-center flex-col gap-4">
        Please connect your wallet
        <ConnectButton />
      </div>
    </AppContainer>
  );
};

export default SignerNotFound;
