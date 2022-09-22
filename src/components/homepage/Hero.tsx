import ClaimModal from "@components/dashboard/ClaimModal";
import LinkProfileCard from "@components/profile/LinkProfileCard";
import Button from "@components/ui/Button";
import Link from "next/link";
import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
type Props = {};

const Hero = (props: Props) => {
  const [claimModal, setClaimModal] = useState<boolean>(false);

  const closeModal = () => {
    setClaimModal(false);
  };

  return (
    <>
      <ClaimModal isOpen={claimModal} closeModal={closeModal} />
      <section className="flex items-center gap-8 flex-wrap justify-center lg:justify-between lg:h-[calc(100vh-112px)]">
        <div className="flex flex-col items-center lg:items-start justify-center">
          <h1 className="text-4xl lg:text-5xl lg:text-left text-center mb-8 selection:bg-brand-600 leading-normal font-bold">
            One place to showcase <br />
            <span className="text-brand-400">all of your links</span>
          </h1>
          <div className="flex gap-4 items-cente">
           <Link href={'/polylinks'}>
            <Button
              onClick={() => setClaimModal(true)}
              size="lg"
              variant="primary"
              >
              See Example
            </Button>
              </Link>
            <Button
              onClick={() => setClaimModal(true)}
              size="lg"
              variant="success"
            >
              Claim Link Now !!
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Tilt  className="cursor-pointer ">
            <LinkProfileCard
              size="sm"
              tokenId={-1}
              links={[
                { title: "Example Link 1", url: "www.example.com" },
                { title: "Example Link 1", url: "www.example.com" },
                { title: "Example Link 1", url: "www.example.com" },
              ]}
              bio="Tell about about your interesting journey , story or just about yourself here."
              displayName="Display Name"
              owner="xyz"
              username="username"
              socials={{
                twitter: "https://twitter.com",
                discord: "https://discord.com",
                email: "xyz@gmail.com",
                github: "https://github.com",
                linkedIn: "https://linkedin.com",
                instagram: "https://instagram.com",
              }}
              coverURI=""
            />
          </Tilt>
        </div>
      </section>
    </>
  );
};

export default Hero;
