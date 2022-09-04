import AppContainer from "@components/layout/AppContainer";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";


type Props = {};

const LinkProfilePage = (props: Props) => {
  const router = useRouter();
  const name = router.query.name as string;

  return (
    <AppContainer>
      <div>
        <p>{name}</p>
        <Link href={`${name}/edit`}>Edit my Page</Link>
      </div>
    </AppContainer>
  );
};

export default LinkProfilePage;
