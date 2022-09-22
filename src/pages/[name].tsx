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
  data: ProfileDataSchema | null;
};

const LinkProfilePage = ({ data }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const name = router.query.name as string;

  if (loading) {
    return <Loading />;
  }


  return (
    // <AppContainer>
    <div className="page-center">
      {/* <Link href={`${name}/edit`}>Edit my Page</Link> */}
      {data ? <LinkProfileCard
        owner={data?.owner || ''}
        tokenId={data?.tokenid || -1}
        username={data?.username || ""}
        bio={data?.bio || ''}
        displayName={data?.displayname || 'DisplayName'}
        coverURI={data?.coveruri}
        links={data?.links as LinkType[] || []}
        socials={data?.socials as Socials || {}}
      /> : "This link has not been claimed yet , be the first to claim it."}
    </div>
    // </AppContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context?.params?.name as string;

  const data = await getProfileDataByUsername(username);
  return {
    props: {
      data: data || null,
    },
  };
};
export default LinkProfilePage;
