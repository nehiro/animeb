import React from 'react';
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const SubpageTitle = ({ children }: Props) => {
  return <h1 className="text-xl font-bold mb-8 flex items-center justify-center">{children}</h1>;
};

export default SubpageTitle;
