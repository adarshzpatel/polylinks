import ConnectWallet from "./ConnectWallet";
import Logo from "./Logo";

type Props = {};

const Navbar = (props: Props) => {
  
  return (
    <header className="p-8 sticky backdrop-blur-xl">
      <nav className="flex max-w-screen-lg mx-auto justify-between">
        <Logo />
        {/* <Button loading variant="primary">Connect Wallet</Button> */}
        <ConnectWallet/>
      </nav>
    </header>
  );
};

export default Navbar;
