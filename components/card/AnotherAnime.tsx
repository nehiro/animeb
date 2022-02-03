import Image from 'next/image';
import Link from 'next/Link';
import React from 'react';

const AnotherAnime = () => {
  return (
    <div className="grid gap-4 grid-cols-2 mb-8">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
        <Link href="/">
          <a className="leading-none flex border p-4">
            <div className="min-w-200 max-w-242 mr-4">
              <Image
                src="/images/hiroaka.png"
                height={338}
                width={242}
                alt=""
              />
            </div>
            <div>
              <h3 className="mb-4 font-bold">僕のヒーローアカデミア</h3>
              <p className="leading-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aliquid, provident et ducimus eligendi optio, omnis sapiente
                magni necessitatibus cupiditate expedita quisquam iste ea modi
                blanditiis laboriosam excepturi quaerat eaque illum!
              </p>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default AnotherAnime;
