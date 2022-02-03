import Link from 'next/Link';
import React from 'react';
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Button = ({ children }: Props) => {
  return (
    <div className="text-center">
      <Link href="/">
        <a className="bg-buttonBlack rounded-full py-3 px-12 text-white mx-auto inline-block relative">
          <div className="flex items-center">
            <span>{children}</span>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Button;
