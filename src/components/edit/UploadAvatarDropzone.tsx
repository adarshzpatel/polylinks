import React from "react";
import { RiImageAddLine } from "react-icons/ri";

type Props = {};

const UploadAvatarDropzone = (props: Props) => {
  return (
    <div>
      <div className="mb-4 font-sora sm:text-center font-medium text-gray-200">
      Choose Avatar 
      </div>
      <div className="border-2 flex items-center justify-center border-gray-500 rounded-full aspect-square w-40  border-dashed">
        <RiImageAddLine className="h-6 w-6" />
      </div>
    </div>
  );
};

export default UploadAvatarDropzone;
