import Card from "@components/ui/Card";
import React from "react";

type Props = {};

const IMAGE_LINK = "https://i.pinimg.com/736x/28/f9/e5/28f9e5b14cae615ff656d759cc6917e5.jpg"

const HeroCard = () => {
    return (
      <Card className="p-4">
        <div>
          <img src={IMAGE_LINK} className="h-2" />
        </div>
        displayName
      </Card>
    )
}

const Hero = (props: Props) => {
  return <section className="flex items-center flex-wrap justify-center">
      <HeroCard/>
  </section>;
};

export default Hero;
