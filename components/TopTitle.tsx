import React from 'react';
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const TopTitle = ({ children }: Props) => {
  return <h2 className="text-xl font-bold mb-8 flex items-center justify-center">{children}</h2>;

};

export default TopTitle;
