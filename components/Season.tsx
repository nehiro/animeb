import Link from 'next/link';
import React from 'react';

const Season = () => {
  const seasonList = [
    {
      href: '/',
      label: '2021年',
      quarters: [
        {
          href: '/',
          label: '春アニメ',
        },
        {
          href: '/',
          label: '夏アニメ',
        },
        {
          href: '/',
          label: '秋アニメ',
        },
        {
          href: '/',
          label: '冬アニメ',
        },
      ],
    },
    {
      href: '/',
      label: '2020年',
      quarters: [
        {
          href: '/',
          label: '春アニメ',
        },
        {
          href: '/',
          label: '夏アニメ',
        },
        {
          href: '/',
          label: '秋アニメ',
        },
        {
          href: '/',
          label: '冬アニメ',
        },
      ],
    },
    {
      href: '/',
      label: '2019年',
      quarters: [
        {
          href: '/',
          label: '春アニメ',
        },
        {
          href: '/',
          label: '夏アニメ',
        },
        {
          href: '/',
          label: '秋アニメ',
        },
        {
          href: '/',
          label: '冬アニメ',
        },
      ],
    },
    {
      href: '/',
      label: '2018年',
      quarters: [
        {
          href: '/',
          label: '春アニメ',
        },
        {
          href: '/',
          label: '夏アニメ',
        },
        {
          href: '/',
          label: '秋アニメ',
        },
        {
          href: '/',
          label: '冬アニメ',
        },
      ],
    },
    {
      href: '/',
      label: '2017年',
      quarters: [
        {
          href: '/',
          label: '春アニメ',
        },
        {
          href: '/',
          label: '夏アニメ',
        },
        {
          href: '/',
          label: '秋アニメ',
        },
        {
          href: '/',
          label: '冬アニメ',
        },
      ],
    },
    {
      href: '/',
      label: '2016年',
      quarters: [
        {
          href: '/',
          label: '春アニメ',
        },
        {
          href: '/',
          label: '夏アニメ',
        },
        {
          href: '/',
          label: '秋アニメ',
        },
        {
          href: '/',
          label: '冬アニメ',
        },
      ],
    },
  ];
  return (
    <div className="container">
      <ul className="mb-8 grid grid-cols-1 justify-items-start gap-y-8 gap-x-12 lg:grid-cols-2">
        {seasonList.map((item) => (
          <li
            key={item.label}
            className="flex w-full items-center justify-between"
          >
            <Link href={item.href}>
              <a className="block px-4 font-bold">{item.label}</a>
            </Link>
            {item.quarters.map((quarter) => (
              <Link key={quarter.label} href={quarter.href}>
                <a className="block">{quarter.label}</a>
              </Link>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Season;
