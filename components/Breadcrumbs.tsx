import { ChevronRightIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React from 'react';

const Breadcrumbs = () => {
  return (
    <section className="bg-gray-100 py-1">
      <ul className="container flex items-center space-x-1 text-sm">
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
