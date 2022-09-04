import Hero from "@components/homepage/Hero";
import AppContainer from "@components/layout/AppContainer";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <AppContainer>
      <div>
        <Hero />
      </div>
    </AppContainer>
  );
};

export default Home;
