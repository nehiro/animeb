import { ChevronRightIcon, HomeIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React from 'react';
import { classNames } from '../lib/classNames';

type Props = {
  pages: {
    href?: string;
    name: string;
  }[];
};

const Breadcrumbs = ({ pages }: Props) => {
  const getItemTag = (isLast: boolean) =>
    (isLast ? 'span' : 'span') as keyof JSX.IntrinsicElements;

  return (
    <section className="bg-gray-100 py-1">
      <nav className="container flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-2 text-sm">
          <li>
            <Link href="/">
              <a className="block text-gray-400 hover:text-gray-500">
                <HomeIcon
                  className="h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="sr-only">ホーム</span>
              </a>
            </Link>
          </li>
          {pages.map((page, index) => {
            const isLast = pages.length - 1 === index;
            const Tag = getItemTag(isLast);

            return isLast ? (
              <li key={page.name}>
                <div className="flex items-center">
                  <ChevronRightIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <Tag
                    href={isLast ? undefined : page.href}
                    className={classNames(
                      'ml-2 text-xs font-medium text-gray-500'
                    )}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {page.name}
                  </Tag>
                </div>
              </li>
            ) : (
              <Link href={('/' + page.href) as string} key={page.name}>
                <a className="block text-gray-400 hover:text-gray-500">
                  <li>
                    <div className="flex items-center">
                      <ChevronRightIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <Tag
                        href={isLast ? undefined : page.href}
                        className={classNames(
                          'ml-2 text-xs font-medium text-gray-500',
                          !isLast && 'hover:text-gray-700'
                        )}
                        aria-current={isLast ? 'page' : undefined}
                      >
                        {page.name}
                      </Tag>
                    </div>
                  </li>
                </a>
              </Link>
            );
          })}
        </ol>
      </nav>
    </section>
  );
};

export default Breadcrumbs;
