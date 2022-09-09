import AppContainer from "@components/layout/AppContainer";
import LinkProfileCard from "@components/profile/LinkProfileCard";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

const LinkProfilePage = (props: Props) => {
  const router = useRouter();
  const name = router.query.name as string;

  return (
    // <AppContainer>
    <div className="flex items-center justify-center min-h-screen">
      {/* <Link href={`${name}/edit`}>Edit my Page</Link> */}
      <LinkProfileCard />
    </div>
    // </AppContainer>
  );
};

export default LinkProfilePage;
