import ClaimInput from "./ClaimInput";

type Props = {};

const Hero = (props: Props) => {
  const [claimModal,setClaimModal] = useState<boolean>(false)
  return (
    <section className="flex items-center flex-wrap justify-between">
      <div className="mt-20">
        <h1 className="text-5xl mb-8 selection:bg-brand-600 leading-normal font-bold">
          One place to showcase <br />
          <span className="text-brand-400">all of your links</span>
        </h1>
        Claim now
      </div>
      <div></div>
    </section>
  );
};

export default Hero;
