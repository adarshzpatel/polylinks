import AddNewLinkModal from "@components/edit/AddNewLinkModal";
import UploadAvatarDropzone from "@components/edit/UploadAvatarDropzone";
import UploadCoverDropzone from "@components/edit/UploadCoverDropzone";
import AppContainer from "@components/layout/AppContainer";
import Button from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import LinkCard from "@components/ui/LinkCard";
import { TextArea } from "@components/ui/TextArea";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import { IoMdClose } from "react-icons/io";
import { HiPlus } from "react-icons/hi";
import {
  TbBrandGithub,
  TbBrandInstagram,
  TbBrandLinkedin,
  TbBrandTwitter,
  TbBrandYoutube,
  TbMail,
} from "react-icons/tb";
import { Blob } from "nft.storage";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { LinkType, NftFormData, ProfileDataSchema, Socials } from "types/nft";
import { getProfileDataById, updateProfileData } from "src/lib/tableland";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-hot-toast";
import LinkNftCard from "@components/dashboard/LInkNftCard";
import LinkProfileCard from "@components/profile/LinkProfileCard";
import { link } from "fs";
import { storeToIpfs } from "src/lib/nftStorage";
import { ifError } from "assert";

type Props = {
  tokenId: string;
  prevValues: ProfileDataSchema | null;
};

const EditPage = ({ tokenId, prevValues }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NftFormData>({
    defaultValues: {
      displayName: prevValues?.displayname,
      bio: prevValues?.bio,
      socials: prevValues?.socials as Socials,
    },
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [links, setLinks] = useState<any>(prevValues?.links || []);
  const [showAddLinkModal, setShowAddLinkModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [coverThumbnail, setCoverThumbnail] = useState<string>("");
  const router = useRouter();
  const handleAddlink = (newLink: LinkType) => {
    setLinks((links: any) => [...links, newLink]);
  };

  const closeModal = () => {
    setShowAddLinkModal(false);
  };

  console.log(prevValues);

  const deleteLink = (i: number) => {
    setLinks((links: any) => links.filter((_: any, idx: number) => idx !== i));
  };

  const updateData: SubmitHandler<NftFormData> = async (data) => {
    // const socialsBlob = new Blob([JSON.stringify({''})]);
    // const owner = prevValues.owner

    setLoading(true);
    try {

      await axios
        .post("/api/update-profile", {
          data: {
            owner: prevValues?.owner,
            tokenid: Number(tokenId),
            bio: data.bio,
            displayname: data.displayName,
            links: JSON.stringify(links),
            socials: JSON.stringify(data.socials),
            coverImage: coverImage,
          },
        })
        .then((res) => res.data);
        toast.success("Edits saved successfully")
        router.push("/" + prevValues?.username);
    } catch (err) {
      console.error(err);
      toast.error("Oops, something went wrong!!");
    }
    setLoading(false);
  };

  if (!prevValues) return <div>This page does not exists</div>;
  return (
    <>
      {isPreviewOpen && (
        <div className="fixed flex-col gap-8 inset-0 bg-gray-900 z-50 flex items-center justify-center">
          <p className="text-gray-600">PREVIEW</p>
          <LinkProfileCard
            bio={watch("bio")}
            displayName={watch("displayName")}
            links={links}
            socials={watch("socials") || {}}
            owner={prevValues.owner}
            tokenId={prevValues.tokenid}
            username={prevValues.username}
            coverURI={coverThumbnail}
          />
          <Button
            variant="primary"
            className="max-w-md w-full"
            onClick={() => setIsPreviewOpen(false)}
          >
            Back to Edit
          </Button>
        </div>
      )}
      <AddNewLinkModal
        isOpen={showAddLinkModal}
        closeModal={closeModal}
        handleAddLink={handleAddlink}
      />
      <>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold border-l-4  border-gray-600 pl-4 py-1">
            Edit{" "}
            <span className="text-brand-400">/ {prevValues?.username} </span>
          </h2>
          <div className="bg-gray-700/50 py-1 px-2 rounded-lg text-sm font-medium">
            Token ID : {tokenId}
          </div>
        </div>
        <form
          onSubmit={handleSubmit(updateData)}
          className="flex flex-col gap-8"
        >
          {/* <p className="text-2xl font-bold text-brand-400">@username</p> */}
          <div className="flex flex-wrap-reverse sm:flex-nowrap gap-8"></div>
          <div className="h-[0.5px] bg-gray-800" />
          <div className="flex flex-wrap gap-8">
            <div className="space-y-4 flex-grow ">
              <Input
                placeholder="Enter display name"
                label="DisplayName"
                {...register("displayName")}
              />

              {/* <UploadAvatarDropzone /> */}

              {/* Description */}
              <TextArea
                label="Bio"
                {...register("bio")}
                placeholder="What's your story ?"
              />
              <p className="text-xl uppercase text-gray-600 font-bold">Links</p>
              <div className="h-[0.5px] bg-gray-800" />

              {links?.map((link: LinkType, i: number) => (
                <div key={link.title} className="flex items-center gap-2">
                  <LinkCard title={link.title} url={link.url} />
                  <button
                    onClick={() => deleteLink(i)}
                    className="border border-red-400 hover:bg-red-900/40 hover:scale-110 active:scale-95 duration-200 ease-out  bg-red-900/20 text-red-400 h-full p-1.5 rounded-lg"
                  >
                    <IoMdClose className="h-6 w-6" />
                  </button>
                </div>
              ))}
              <Button
                icon={<HiPlus className="h-5 w-5" />}
                variant="secondary"
                className="border-dashed"
                outline
                type="button"
                onClick={() => setShowAddLinkModal(true)}
              >
                Add New Link
              </Button>
            </div>
            <div className="max-w-md flex-1 ">
              {/* <p className="font-bold text-lg text-gray-500  mb-4">
              Social Links
            </p> */}
              <div className="space-y-4 ">
                <UploadCoverDropzone
                  thumbnail={coverThumbnail}
                  setThumbnail={setCoverThumbnail}
                  file={coverImage}
                  setFile={setCoverImage}
                />
                <Input
                  pre={<TbBrandTwitter className="h-6 w-6" />}
                  label="Twitter"
                  placeholder="https://twitter.com/xyz"
                  {...register("socials.twitter")}
                />
                <Input
                  pre={<TbBrandGithub className="h-6 w-6" />}
                  label="Github"
                  placeholder="https://github.com/xyz"
                  {...register("socials.github")}
                />
                <Input
                  pre={<TbBrandInstagram className="h-6 w-6" />}
                  label="Instagram"
                  placeholder="https://instagram.com/xyz"
                  {...register("socials.instagram")}
                />
                <Input
                  pre={<TbBrandLinkedin className="h-6 w-6" />}
                  label="LinkedIn"
                  placeholder="https://linkedin.com/in/xyz"
                  {...register("socials.linkedIn")}
                />
                <Input
                  pre={<TbBrandYoutube className="h-6 w-6" />}
                  label="YouTube"
                  placeholder="https://youtube.com/c/xyz"
                  {...register("socials.youtube")}
                />
                <Input
                  pre={<TbMail className="h-6 w-6" />}
                  label="Email"
                  type="email"
                  placeholder="xyz@abc.com"
                  {...register("socials.email")}
                />
              </div>
            </div>
          </div>
          <div className="h-[0.5px] bg-gray-800" />
          <div className="flex gap-4">
            <Button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              variant="primary"
            >
              View Preview
            </Button>
            <Button loading={loading} variant="success" type="submit">
              Save Changes
            </Button>
          </div>
          {/* <div>
          <Button icon={<HiPlus />} className="border-dashed border-2 " outline>
            Add Group
          </Button>
        </div> */}
        </form>
      </>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  /*
  1. Fetch data from tableland
  2. Check if the user owns the tokenId 
  3. Redirect if not owner   
  */

  // fetch data from tableland
  const tokenId = context?.params?.tokenId as string;
  const prevValues = await getProfileDataById(tokenId);
  return {
    props: {
      tokenId,
      prevValues: prevValues ? prevValues : null,
    },
  };
};

export default EditPage;
