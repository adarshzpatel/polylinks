import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { RiImageAddLine } from "react-icons/ri";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { HiXCircle } from "react-icons/hi";
import Button from "@components/ui/Button";
import { FiX } from "react-icons/fi";
import Tooltip from "@components/ui/Tooltip";

type FileWithPreview = {
  previewUrl: string;
} & File;

type Props = {
  setFile: Dispatch<SetStateAction<File | null>>;
  file: File | null;
  thumbnail: string;
  setThumbnail: Dispatch<SetStateAction<string>>;
};

const UploadCoverDropzone = ({
  file,
  setFile,
  thumbnail,
  setThumbnail,
}: Props) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    let previewUrl;
    previewUrl = URL.createObjectURL(acceptedFiles[0]);
    console.log(acceptedFiles);
    setFile(acceptedFiles[0]);
    setThumbnail(previewUrl);
    console.log({ file, thumbnail });
  }, []);

  const { getRootProps, getInputProps, isDragReject, isDragAccept } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: {
        "image/png": [".png"],
        "image/jpeg": [".jpeg", ".jpeg"],
        "image/gif": [".gif"],
        "image/svg+xml": [".svg"],
      },
    });

  const clearFile = () => {
    setFile(null);
    setThumbnail("");
  };

  useEffect(() => {
    if (isDragReject) {
      toast.error("File type not supported.");
      clearFile();
    }
  }, [isDragReject]);

  return (
    <div className="max-w-md">
      <div className="mb-4 font-sora font-medium text-gray-200">
        Choose Cover Picture
      </div>
      <div {...getRootProps()}>
        {!file && (
          <div className="border-2 text-gray-400 flex flex-col gap-2 cursor-pointer items-center justify-center border-gray-500 rounded-lg h-[252px]  border-dashed">
            <input {...getInputProps()} />
            <RiImageAddLine className="h-6 w-6" />
            <p className="text-sm">Upload Cover Image</p>
            <p className="text-xs">( JPG , PNG , GIF , SVG )</p>
          </div>
        )}
      </div>
      {file && (
        <div className="border-2 overflow-hidden text-gray-400 flex flex-col gap-2 cursor-pointer items-center justify-center border-gray-500 rounded-lg h-[252px]  border-dashed">
          <img
            src={thumbnail.toString()}
            alt="preview"
            className="w-full object-cover object-cover"
          />
        </div>
      )}
      {file && (
        <div className="rounded-md mt-4 border-gray-500 border flex items-center justify-between p-2 pl-4">
          {file.name}
          <Tooltip content="Clear Image">
            <Button className="!p-1" variant="danger" onClick={clearFile}>
              <FiX />
            </Button>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default UploadCoverDropzone;
