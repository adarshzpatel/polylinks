import React, { useState } from "react";
import AppContainer from "@components/layout/AppContainer";
import Heading from "@components/ui/Heading";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Moralis from "moralis";

type Props = {};

const DashboardPage = (props: Props) => {
  const [loading, setLoading] = useState<boolean>();
  return (
    <AppContainer>
      <Heading>Dashboard</Heading>
    </AppContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  console.log(session);

  await Moralis.start({apiKey:process.env.MORALIS_API_KEY})
  return {
    props: {
      content: session
        ? "You are authenticated. So you can get my secret now - I'm a mage"
        : "Authenticate to get my secret",
    },
  };
};

export default DashboardPage;
