import React from 'react';
import BackGroundWhite from './BackGroundWhite';
import Image from 'next/image';
import BackGroundGray from './BackGroundGray';

const NoContents = () => {
  return (
    <BackGroundGray>
      <div className="flex flex-col items-center justify-center">
        <Image src="/images/no-contents.png" width={220} height={181} />
        <p>コンテンツがありません。ごめんなさい！！！</p>
      </div>
    </BackGroundGray>
  );
};

export default NoContents;
