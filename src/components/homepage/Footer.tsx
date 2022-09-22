import Logo from "@components/layout/Logo";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <section className="border-t border-gray-600 py-8 mt-16">
      <div className="flex items-center justify-between">
        <Logo />
        <div>
          Made by @{" "}
          <a
          className=""
            target={"_blank"}
            rel="noreferrer"
            href="https://twitter.com/adarshzpatel"
          >
            <em className="text-brand-400">adarsh</em>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Footer;
