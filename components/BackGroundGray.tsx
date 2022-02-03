import React from 'react';
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const BackGroundGray = ({ children }: Props) => {
  return (
    <section className="bg-bgGray py-12">
      <div className="container">{children}</div>
    </section>
  );
};

export default BackGroundGray;
