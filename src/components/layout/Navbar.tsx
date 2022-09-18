import Button from "@components/ui/Button";
import axios from "axios";
import ConnectWallet from "./ConnectWallet";
import Logo from "./Logo";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <header className="p-8 sticky backdrop-blur-xl ">
      <nav className="flex max-w-screen-lg mx-auto justify-between">
        <Logo />
        <ConnectWallet />
      </nav>
    </header>
  );
};

export default Navbar;
