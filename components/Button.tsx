import Link from 'next/link';
import React from 'react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Button = ({ children }: Props) => {
  return (
    <div className="text-center">
      <Link href="/">
        <a className="relative mx-auto inline-block rounded-full bg-buttonBlack py-3 px-12 text-white">
          <div className="flex items-center">
            <span>{children}</span>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Button;
