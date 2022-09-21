import ClaimModal from "@components/dashboard/ClaimModal";
import Hero from "@components/homepage/Hero";
import AppContainer from "@components/layout/AppContainer";
import Button from "@components/ui/Button";
import type { NextPage } from "next";
import { useState } from "react";
import { createNewProfileDataRow, createNewTable } from "src/lib/tableland";
import { useAccount } from "wagmi";

const Home: NextPage = () => {

  const [claimModal,setClaimModal] = useState<boolean>(true)
  const { address } = useAccount();
  const handleCreateTable = async () => {
    try {
      if (!address) throw new Error("CONNECT WALLET FIRST");
      const res = await createNewProfileDataRow({
        owner: address,
        tokenId: 0,
        username: "overlord",
      });
      console.log({ res });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <AppContainer>
      <ClaimModal closeModal={()=>setClaimModal(false)} isOpen={claimModal} />
      <div>
        <Hero />
      </div>
      <Button onClick={createNewTable}>Create new table</Button>
      <Button variant="primary" onClick={createNewTable}>Create new table</Button>
      <Button variant="success" onClick={createNewTable}>Create new table</Button>
      <Button variant="danger" onClick={createNewTable}>Create new table</Button>

    </AppContainer>
  );
};

export default Home;
