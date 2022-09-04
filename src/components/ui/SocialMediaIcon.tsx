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
        className="bg-gray-800 hover:bg-gray-700 rounded-full text-gray-400 hover:text-cyan-400 p-2"
      >
        <Icon className="h-6 w-6 " />
      </a>
    </Tooltip>
  );
};

export default SocialMediaIcon;
