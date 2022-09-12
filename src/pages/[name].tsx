import LinkProfileCard from "@components/profile/LinkProfileCard";
import { useRouter } from "next/router";

type Props = {};

const LinkProfilePage = (props: Props) => {
  const router = useRouter();
  const name = router.query.name as string;

  return (
    // <AppContainer>
    <div className="flex items-center justify-center min-h-screen">
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
