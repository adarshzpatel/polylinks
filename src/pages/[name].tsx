import React, { useState } from "react";
import LinkProfileCard from "@components/profile/LinkProfileCard";
import { useRouter } from "next/router";
import { connect } from "@tableland/sdk";
import Loading from "@components/ui/Loading";
import { GetServerSideProps } from "next";
import { getProfileDataByUsername } from "src/lib/tableland";
import { LinkType, ProfileDataSchema, Socials } from "types/nft";
import AppContainer from "@components/layout/AppContainer";

type Props = {
  data: ProfileDataSchema | undefined;
};

const LinkProfilePage = ({ data }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const name = router.query.name as string;

  if (loading) {
    return <Loading />;
  }

  if (data === null) {
    return (
      <AppContainer>
        {" "}
        <div className="page-center">
          This link hasn not been claimed yet , be the first to claim it
        </div>
      </AppContainer>
    );
  }

  return (
    // <AppContainer>
    <div className="flex items-center justify-center min-h-screen">
      {/* <Link href={`${name}/edit`}>Edit my Page</Link> */}
      <LinkProfileCard
        owner={data?.owner || ''}
        tokenId={data?.tokenid || -1}
        username={data?.username || ""}
        bio={data?.bio || ''}
        displayName={data?.displayname || 'DisplayName'}
        coverURI="https://images.unsplash.com/photo-1662869633285-13fe05236a72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1460&q=80"
        links={data?.links as LinkType[] || []}
        socials={data?.socials as Socials || {}}
      />
    </div>
    // </AppContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context?.params?.name as string;

  const data = await getProfileDataByUsername(username);
  console.log(data)
  return {
    props: {
      data: data,
    },
  };
};
export default LinkProfilePage;
