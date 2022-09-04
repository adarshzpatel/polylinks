import React from "react";
import { RiImageAddLine } from "react-icons/ri";

type Props = {};

const UploadCoverDropzone = (props: Props) => {
  return (
    <div className="w-full">
      <div className="mb-4 font-sora font-medium text-gray-200">
        Choose Cover Picture
      </div>
      <div className="border-2 flex  items-center justify-center border-gray-500 rounded-lg h-40  border-dashed">
        <div className=""></div>
        <RiImageAddLine className="h-6 w-6" />
      </div>
    </div>
  );
};

export default UploadCoverDropzone;
