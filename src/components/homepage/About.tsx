import Heading from "@components/ui/Heading";
import React from "react";

type Props = {};

const About = (props: Props) => {
  return (
    <section className="mt-16">
      <Heading className="mb-8">
        About <span className="text-brand-400">Polylinks</span>
      </Heading>
      <p className="md:text-xl text-gray-400 leading-relaxed md:leading-[2rem]">
        Polylinks is the <em> decentralized alternative </em> to web2 platforms
        like Linktree . Get a cool profile page that you own , and showoff your
        links . Polylinks utlises technologies{" "}
        <em> polygon, moralis , filecoin , and tableland </em> to do what it
        does in a decentralized manner .
      </p>
    </section>
  );
};

export default About;
