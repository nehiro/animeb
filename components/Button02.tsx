import Link from 'next/Link';
import React from 'react';
import { ReactNode } from 'react';

type Size = 'lg' | 'md' | 'sm'

type ButtonProps = {
  children: ReactNode;
  size?: Size;
  href: string;
};

const mapSize = (size : Size) => {
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
    <div className="text-center col-span-2">
      <Link href={props.href}>
        <a className="bg-buttonBlack rounded-lg py-3 px-10 text-white mx-auto block relative min-w-180">
          <div>
            <span>{props.children}</span>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Button02;
