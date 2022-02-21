import Link from 'next/link';
import React from 'react';
import { ReactNode } from 'react';

type Size = 'lg' | 'md' | 'sm';

type ButtonProps = {
  children: ReactNode;
  size?: Size;
  href: string;
};

const mapSize = (size: Size) => {
  switch (size) {
    case 'sm':
      break;
    case 'md':
      break;
    case 'lg':
      break;
  }
};

const Button02 = (props: ButtonProps) => {
  return (
    <div className="col-span-2 text-center">
      <Link href={props.href}>
        <a className="relative mx-auto block min-w-180 rounded-lg bg-buttonBlack py-3 px-10 text-white">
          <div>
            <span>{props.children}</span>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Button02;
