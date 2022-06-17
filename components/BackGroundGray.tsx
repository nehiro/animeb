import React from 'react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const BackGroundGray = ({ children }: Props) => {
  return (
    <section className="bg-gray-50 py-6 sm:py-12">
      <div className="container">{children}</div>
    </section>
  );
};

export default BackGroundGray;
