import ClaimInput from "./ClaimInput";

type Props = {};

const Hero = (props: Props) => {
  return (
    <section className="flex items-center flex-wrap justify-between">
      <div className="mt-20">
        <h1 className="text-5xl mb-8 selection:bg-brand-600 leading-normal font-bold">
          One place to showcase <br />
          <span className="text-brand-400">all of your links</span>
        </h1>
        <ClaimInput />
      </div>
      <div></div>
    </section>
  );
};

export default Hero;
