import Heading from "@components/ui/Heading";
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

type Props = {};

const Roadmap = (props: Props) => {
  return (
    <section className="mt-16">
      <Heading className="mb-8">Roadmap</Heading>{" "}
      <div className="pl-10">
        <div className="group py-8 md:hover:bg-zinc-800/50 relative border-l-2 border-zinc-600 md:hover:border-zinc-400 pl-8 md:hover:pr-4  duration-300 easae-out">
          <div className="absolute -left-[11px] h-5 w-5 border-2 bg-zinc-900 border-zinc-500 md:group-hover:border-zinc-300 rounded-full "></div>
          <div className="flex flex-col gap-2  text-base justify-between">
            <p className="  text-zinc-300 font-medium ">
              Get a good short domain
            </p>
          </div>
        </div>
        <div className="group py-8 md:hover:bg-zinc-800/50 relative border-l-2 border-zinc-600 md:hover:border-zinc-400 pl-8 md:hover:pr-4  duration-300 easae-out">
          <div className="absolute -left-[11px] h-5 w-5 border-2 bg-zinc-900 border-zinc-500 md:group-hover:border-zinc-300 rounded-full "></div>
          <div className="flex flex-col gap-2  text-base justify-between">
            <p className="  text-zinc-300 font-medium ">Launch on Mainnet</p>
          </div>
        </div>
        <div className="group py-8 md:hover:bg-zinc-800/50 relative border-l-2 border-zinc-600 md:hover:border-zinc-400 pl-8 md:hover:pr-4  duration-300 easae-out">
          <div className="absolute -left-[11px] h-5 w-5 border-2 bg-zinc-900 border-zinc-500 md:group-hover:border-zinc-300 rounded-full "></div>
          <div className="flex flex-col gap-2  text-base justify-between">
            <p className="  text-zinc-300 font-medium ">
              Introduce different types of designs for page
            </p>
          </div>
        </div>
        <div className="group py-8 md:hover:bg-zinc-800/50 relative border-l-2 border-zinc-600 md:hover:border-zinc-400 pl-8 md:hover:pr-4  duration-300 easae-out">
          <div className="absolute -left-[11px] h-5 w-5 border-2 bg-zinc-900 border-zinc-500 md:group-hover:border-zinc-300 rounded-full "></div>
          <div className="flex flex-col gap-2  text-base justify-between">
            <p className="  text-zinc-300 font-medium ">... many more</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
