import React , { useState} from 'react'
import AppContainer from "@components/layout/AppContainer";
import Heading from "@components/ui/Heading";

type Props = {};

const DashboardPage = (props: Props) => {
  const [loading,setLoading] = useState<boolean>();

  const getOwnedNFTs = async () => {
    
  }

  return (
    <AppContainer>
      <Heading>Dashboard</Heading>

    </AppContainer>
  );
};

export default DashboardPage;
