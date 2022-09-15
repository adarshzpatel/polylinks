import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { signIn } from "next-auth/react";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import axios from "axios";
import AppContainer from "@components/layout/AppContainer";
import Button from "@components/ui/Button";

function SignIn() {
  
  return (
    <AppContainer>
      <div className="page-center flex-col gap-4">
        <h3>Web3 Authentication</h3>
        <Button variant="primary" onClick={() => handleAuth()}>
          Authenticate via Metamask
        </Button>
      </div>
    </AppContainer>
  );
}

export default SignIn;
