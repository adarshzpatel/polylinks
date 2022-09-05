import Avatar from "@components/ui/Avatar";
import Card from "@components/ui/Card";
import SocialMediaIcon from "@components/ui/SocialMediaIcon";
import React from "react";
import { FiExternalLink } from "react-icons/fi";
import {
  TbBrandDiscord,
  TbBrandGithub,
  TbBrandTwitter,
  TbBrandYoutube,
  TbMail,
} from "react-icons/tb";

type Props = {};

const IMAGE_LINK =
  "https://i.pinimg.com/736x/28/f9/e5/28f9e5b14cae615ff656d759cc6917e5.jpg";

const HeroCard = () => {
  return (
    <Card className="max-w-md w-full">
      <img
        src={IMAGE_LINK}
        className="h-40 w-full object-cover object-center"
      />
      <div className="p-6 space-y-3">
        <div className="flex items-center gap-4">
          <Avatar src={IMAGE_LINK} />
          <div>
            <p className="text-2xl font-medium">Display Name</p>
            <div className="mt-2 flex items-center gap-2">
              <SocialMediaIcon
                icon={TbBrandTwitter}
                href="https://twitter.com"
                name="Twitter"
              />
              <SocialMediaIcon
                icon={TbBrandDiscord}
                href="https://twitter.com"
                name="Discord"
              />
              <SocialMediaIcon
                icon={TbBrandGithub}
                href="https://twitter.com"
                name="Github"
              />
              <SocialMediaIcon
                icon={TbMail}
                href="https://twitter.com"
                name="TbMail"
              />
              <SocialMediaIcon
                icon={TbBrandYoutube}
                href="https://twitter.com"
                name="Youtube"
              />
            </div>
          </div>
        </div>
        <div>
          <a className="text-brand-400 font-medium">@username</a>
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, quos
            eius atque iste tempora provident soluta sunt fugit sed .
          </p>
        </div>
        <div>
          {/* <p className="font-bold tracking-wider text-gray-400">LINKS</p> */}
          <div className="space-y-3 mt-6">
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="bg-gray-800/75 hover:shadow-xl py-2 px-4 rounded-lg  hover:ring-1  ring-gray-600 hover:ring-brand-400 hover:bg-brand-900/20 flex items-center justify-between gap-2 duration-300 ease-out hover:text-brand-300 "
            >
              Link Title <FiExternalLink />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="bg-gray-800/75 hover:shadow-xl py-2 px-4 rounded-lg  hover:ring-1  ring-gray-600 hover:ring-brand-400 hover:bg-brand-900/20 flex items-center justify-between gap-2 duration-300 ease-out hover:text-brand-300 "
            >
              Link Title <FiExternalLink />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="bg-gray-800/75 hover:shadow-xl py-2 px-4 rounded-lg  hover:ring-1  ring-gray-600 hover:ring-brand-400 hover:bg-brand-900/20 flex items-center justify-between gap-2 duration-300 ease-out hover:text-brand-300 "
            >
              Link Title <FiExternalLink />
            </a>
          
           
          
          </div>
        </div>
      </div>
    </Card>
  );
};

const Hero = (props: Props) => {
  return (
    <section className="flex items-center flex-wrap justify-center">
      <HeroCard />
    </section>
  );
};

export default Hero;
