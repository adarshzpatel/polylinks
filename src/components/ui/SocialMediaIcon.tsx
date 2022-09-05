import { IconType } from "react-icons";
import Tooltip from "./Tooltip";

type SocialMediaIconProps = {
  icon: IconType;
  href: string;
  name: string;
};

const SocialMediaIcon = ({ icon: Icon, href, name }: SocialMediaIconProps) => {
  return (
    <Tooltip content={name}>
      <a
        href={href}
        className="bg-gray-700/50 duration-300 ease-out  rounded-lg text-gray-400 hover:ring-1 hover:ring-brand-400 hover:text-brand-400 hover:bg-brand-700/20  p-2"
      >
        <Icon className="h-6 w-6 " />
      </a>
    </Tooltip>
  );
};

export default SocialMediaIcon;
