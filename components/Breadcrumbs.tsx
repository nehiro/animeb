import { ChevronRightIcon } from '@heroicons/react/solid';
import Link from 'next/Link';
import React from 'react';

const Breadcrumbs = () => {
  return (
    <section className="bg-breadcrumbs py-1">
      <ul className="container flex items-center text-sm space-x-1">
        <li>
          <Link href="/">
            <a>TOP</a>
          </Link>
        </li>
        <li>
          <ChevronRightIcon height={15} width={15} />
        </li>
      </ul>
    </section>
  );
};

export default Breadcrumbs;
