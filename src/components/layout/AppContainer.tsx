import React from "react";
import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
};

const AppContainer = (props: Props) => {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-lg   mx-auto p-8 xl:px-0">
        {props.children}
      </div>
    </>
  );
};

export default AppContainer;
