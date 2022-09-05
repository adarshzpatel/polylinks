import AddNewLinkModal from "@components/edit/AddNewLinkModal";
import UploadAvatarDropzone from "@components/edit/UploadAvatarDropzone";
import UploadCoverDropzone from "@components/edit/UploadCoverDropzone";
import AppContainer from "@components/layout/AppContainer";
import Button from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import LinkCard from "@components/ui/LinkCard";
import { TextArea } from "@components/ui/TextArea";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
type Props = {};

export type LinkItem = {
  title: string;
  url: string;
};

const EditPage = (props: Props) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const [links, setLinks] = useState<LinkItem[]>([
    { title: "test", url: "test.com" },
  ]);
  const [showAddLinkModal, setShowAddLinkModal] = useState<boolean>(false);

  const handleAddlink = (newLink: LinkItem) => {
    setLinks((links) => [...links, newLink]);
  };

  const closeModal = () => {
    setShowAddLinkModal(false);
  };

  const deleteLink = (i: number) => {
    setLinks((links) => links.filter((_, idx) => idx !== i));
  };
  const updateData: SubmitHandler<any> = (data) => {
    console.log(data);
  };

  return (
    <>
      <AddNewLinkModal
        isOpen={showAddLinkModal}
        closeModal={closeModal}
        handleAddLink={handleAddlink}
      />
      <AppContainer>
        <h2 className="text-2xl font-bold border-l-4 mb-8 border-gray-600 pl-4 py-1">
          Edit my page
        </h2>

        <form
          onSubmit={handleSubmit(updateData)}
          className="flex flex-col gap-8"
        >
          {/* <p className="text-2xl font-bold text-brand-400">@username</p> */}
          <div className="flex flex-wrap-reverse sm:flex-nowrap gap-8">
            <UploadCoverDropzone />
            <UploadAvatarDropzone />
          </div>
          <div className="h-[0.5px] bg-gray-800" />
          <div className="grid md:grid-cols-5 gap-8">
            <div className="space-y-4 col-span-3">
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

              {links?.map((link, i) => (
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
                onClick={() => setShowAddLinkModal(true)}
              >
                Add New Link
              </Button>
            </div>
            <div className="col-span-2">
              {/* <p className="font-bold text-lg text-gray-500  mb-4">
              Social Links
            </p> */}
              <div className="space-y-4">
                <Input
                  pre={<TbBrandTwitter className="h-6 w-6" />}
                  label="Twitter"
                  placeholder="Enter Twitter Link"
                  {...register("twitter")}
                />
                <Input
                  pre={<TbBrandGithub className="h-6 w-6" />}
                  label="Github"
                  placeholder="Enter Github Link"
                  {...register("github")}
                />
                <Input
                  pre={<TbBrandInstagram className="h-6 w-6" />}
                  label="Instagram"
                  placeholder="Enter Instagram Link"
                  {...register("instagram")}
                />
                <Input
                  pre={<TbBrandLinkedin className="h-6 w-6" />}
                  label="LinkedIn"
                  placeholder="Enter LinkedIn Link"
                  {...register("linkedin")}
                />
                <Input
                  pre={<TbBrandYoutube className="h-6 w-6" />}
                  label="YouTube"
                  placeholder="Enter Youtube Link"
                  {...register("youtube")}
                />
                <Input
                  pre={<TbMail className="h-6 w-6" />}
                  label="Email"
                  type="email"
                  placeholder="Enter email"
                  {...register("email")}
                />

                {/* <Input
              pre={<TbBrandTwitter className="h-6 w-6" />}
              label="Facebook"
              placeholder="Enter Facebook Link"
            /> */}
              </div>
            </div>
          </div>
          <div className="h-[0.5px] bg-gray-800" />
          <div className="flex gap-4">
            <Button variant="primary">View Preview</Button>
            <Button variant="success" loading>
              Save Changes
            </Button>
          </div>
          {/* <div>
          <Button icon={<HiPlus />} className="border-dashed border-2 " outline>
            Add Group
          </Button>
        </div> */}
        </form>
      </AppContainer>
    </>
  );
};

export default EditPage;
