import React from "react";

interface Props extends React.HTMLProps<HTMLImageElement> {
  src:string 
}

const Avatar = ({src,...props}:Props) => {
  return (
    <div className="rounded-full overflow-hidden aspect-square h-24 w-24 ring-cyan ring-1">
      <img src={src} alt='avatar' className="object-center object-cover h-full w-full" />
    </div>
  );
};

export default Avatar;
