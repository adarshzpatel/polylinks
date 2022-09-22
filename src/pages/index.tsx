import ClaimModal from "@components/dashboard/ClaimModal";
import About from "@components/homepage/About";
import Footer from "@components/homepage/Footer";
import Hero from "@components/homepage/Hero";
import Roadmap from "@components/homepage/Roadmap";
import AppContainer from "@components/layout/AppContainer";
import Button from "@components/ui/Button";
import type { NextPage } from "next";
import { useState } from "react";
import {
  createNewProfileDataRow,
  createNewTable,
  getMyTable,
} from "src/lib/tableland";
import { useAccount } from "wagmi";

const Home: NextPage = () => {
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
    <>
      <div>
        <Hero />
        <About />
        <Roadmap />
        <Footer />
      </div>
    </>
  );
};

export default Home;
