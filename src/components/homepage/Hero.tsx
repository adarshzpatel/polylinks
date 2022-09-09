type Props = {};

const Hero = (props: Props) => {
  return (
    <section className="flex items-center flex-wrap justify-between">
      <div className="mt-20">
        <h1 className="text-5xl selection:bg-brand-600 leading-normal font-bold">
          One place to showcase <br />
          <span className="bg-brand-600 px-4 ">all of your links</span>
        </h1>
      </div>
      <div></div>
    </section>
  );
};

export default Hero;
