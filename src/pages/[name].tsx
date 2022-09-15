import React, { useState } from "react";
import LinkProfileCard from "@components/profile/LinkProfileCard";
import { useRouter } from "next/router";
import { connect } from "@tableland/sdk";
import Loading from "@components/ui/Loading";

type Props = {};

const LinkProfilePage = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const name = router.query.name as string;

  if(loading) {
    return <Loading/>
  }
  const getProfileData = async () => {
    setLoading(true);

    const tableland = await connect({
      chain: "polygon-mumbai",
      network: "testnet",
    });
    const res = await tableland.read(`SELECT * FROM polylinks_80001_1848 WHERE username = ${name}`);
    console.log(res);
    setLoading(false);
    setLoading(false);
  };

  return (
    // <AppContainer>
    <div className="flex items-center justify-center min-h-screen">
      <button onClick={getProfileData}>Get Dta</button>
      {/* <Link href={`${name}/edit`}>Edit my Page</Link> */}
      <LinkProfileCard
        username={name}
        bio="Placeholder bio"
        displayName={name}
        coverURI="https://images.unsplash.com/photo-1662869633285-13fe05236a72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1460&q=80"
        links={[{ title: "Portfolio", url: "https://adarshzpatel.vercel.app" }]}
        socials={{ twitter: "https://twiiter.com/adarshzpatel" }}
      />
    </div>
    // </AppContainer>
  );
};

export default LinkProfilePage;
