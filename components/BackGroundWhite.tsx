import React from 'react';
import { ReactNode } from 'react';

// interface Props {
//   children: ReactNode;
// }

const BackGroundWhite = (props: { children: ReactNode }) => {
  return (
    <section className="bg-white py-12">
      <div className="container">{props.children}</div>
    </section>
  );
};

export default BackGroundWhite;
