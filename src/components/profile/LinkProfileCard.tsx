import Card from "@components/ui/Card";
import SocialMediaIcon from "@components/ui/SocialMediaIcon";
import { FiExternalLink } from "react-icons/fi";
import {
  TbBrandDiscord,
  TbBrandGithub,
  TbBrandInstagram,
  TbBrandLinkedin,
  TbBrandTwitter,
  TbBrandYoutube,
  TbMail,
} from "react-icons/tb";
import { POLYLINK_CONTRACT_ADDRESS } from "smart-contract/contract";
import { LinkType, ProfileData } from "types/nft";

const DEFAULT_IMAGE =
  "https://i.pinimg.com/736x/28/f9/e5/28f9e5b14cae615ff656d759cc6917e5.jpg";

type CardSize = {
  size?: 'sm' | 'md'
}

const LinkProfileCard = ({
  displayName,
  username,
  links,
  socials,
  bio,
  tokenId,
  coverURI,
  size='md'
}: ProfileData & CardSize) => {
  console.log({coverURI})
  return (
    <Card className={`${size === 'md' ? "max-w-md" : "max-w-sm"} w-full shadow-xl`}>
      <img
        src={DEFAULT_IMAGE}
        className=" w-full object-cover aspect-video object-center"
      />
      <div className={`${size === 'md' ? "p-6 space-y-3" : "p-4 space-y-2"} `}>
        <div className="flex items-center gap-4">
          {/* <Avatar src={IMAGE_LINK} /> */}
          <div>
            <p className="text-lg font-medium">{displayName}</p>
            <a href={`https://testnets.opensea.io/assets/mumbai/${POLYLINK_CONTRACT_ADDRESS}/${tokenId}`} className="text-brand-400 font-medium">@ {username}</a>
            <div className="mt-2 flex items-center gap-2">
              {socials.twitter && (
                <SocialMediaIcon
                  icon={TbBrandTwitter}
                  href={socials.twitter}
                  name="Twitter"
                />
              )}
              {socials.discord && (
                <SocialMediaIcon
                  icon={TbBrandDiscord}
                  href={socials.discord}
                  name="Discord"
                />
              )}
              {socials.github && (
                <SocialMediaIcon
                  icon={TbBrandGithub}
                  href={socials.github}
                  name="Github"
                />
              )}
              {socials.email && (
                <SocialMediaIcon
                  icon={TbMail}
                  href={"mailto:" + socials.email}
                  name="TbMail"
                />
              )}
              {socials.youtube && (
                <SocialMediaIcon
                  icon={TbBrandYoutube}
                  href="https://twitter.com"
                  name="Youtube"
                />
              )}
              {socials.linkedIn && (
                <SocialMediaIcon
                  icon={TbBrandLinkedin}
                  href={socials.linkedIn}
                  name="LinkedIn"
                />
              )}
              {socials.instagram && (
                <SocialMediaIcon
                  icon={TbBrandInstagram}
                  href={socials.instagram}
                  name="Instagram"
                />
              )}
            </div>
          </div>
        </div>
        <div>
          <p className="text-gray-400 text-sm">
            {bio}
          </p>
        </div>
        <div>
          {/* <p className="font-bold tracking-wider text-gray-400">LINKS</p> */}
          <div className={`${size === 'md' ? "space-y-3 mt-6":"space-y-1.5 mt-3" }`}>
            {links?.map((item, id: number) => (
              <a
                key={id}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className={`bg-gray-800/75 hover:shadow-xl ${size === 'md' ? "py-2 px-4 text-base" : "py-1 px-2 text-sm"}  rounded-lg  hover:ring-1  ring-gray-600 hover:ring-brand-400 hover:bg-brand-900/20 flex items-center justify-between gap-2 duration-300 ease-out hover:text-brand-300`}
              >
                {item?.title || "Unknown Link"}
                <FiExternalLink />
              </a>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LinkProfileCard;
