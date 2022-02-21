import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const StreamingService = () => {
  const streamingServices = [
    {
      href: '/',
      label: 'Amazon Prime Video',
      icon: (
        <Image src="/images/amazon.png" width="76px" height="76px" alt="" />
      ),
    },
    {
      href: '/',
      label: 'U-NEXT',
      icon: <Image src="/images/unext.png" width="76px" height="76px" alt="" />,
    },
    {
      href: '/',
      label: 'Disney+',
      icon: (
        <Image src="/images/disney.png" width="76px" height="76px" alt="" />
      ),
    },
    {
      href: '/',
      label: 'Rakuten TV',
      icon: (
        <Image src="/images/rakuten.png" width="76px" height="76px" alt="" />
      ),
    },
    {
      href: '/',
      label: 'FOD',
      icon: <Image src="/images/fod.png" width="76px" height="76px" alt="" />,
    },
    {
      href: '/',
      label: 'TELASA',
      icon: (
        <Image src="/images/telasa.png" width="76px" height="76px" alt="" />
      ),
    },
    {
      href: '/',
      label: 'ビデオマーケット',
      icon: (
        <Image
          src="/images/videomarket.png"
          width="76px"
          height="76px"
          alt=""
        />
      ),
    },
    {
      href: '/',
      label: 'dTV',
      icon: <Image src="/images/dtv.png" width="76px" height="76px" alt="" />,
    },
    {
      href: '/',
      label: 'Hulu',
      icon: <Image src="/images/hulu.png" width="76px" height="76px" alt="" />,
    },
    {
      href: '/',
      label: 'Netflix',
      icon: <Image src="/images/netflix.png" width="76px" height="76" alt="" />,
    },
  ];
  return (
    <ul className="grid-cols-gridResponsive grid justify-items-start gap-4">
      {streamingServices.map((item) => (
        <li key={item.label}>
          <Link href={item.href}>
            <a className="grid-cols-gridstreaming grid grid-rows-1 items-center">
              {item.icon}
              <span className="ml-4 inline-block">
                {item.label}で鑑賞できるアニメ
              </span>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default StreamingService;
