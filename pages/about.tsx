import React, { ReactElement } from 'react';
import BackGroundGray from '../components/BackGroundGray';
import BackGroundWhite from '../components/BackGroundWhite';
import Breadcrumbs from '../components/Breadcrumbs';
import NoContents from '../components/NoContents';
import SubpageTitle from '../components/SubpageTitle';
import LayoutNoNav from '../layouts/LayoutNoNav';

const About = () => {
  return (
    <>
      <Breadcrumbs
        pages={[
          {
            name: 'アニメ部！について',
          },
        ]}
      />
      <BackGroundWhite>
        <SubpageTitle>アニメ部！について</SubpageTitle>
        <div className="overflow-hidden bg-white">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="relative lg:col-start-2 lg:row-start-1">
              <div className="relative mx-auto max-w-prose text-base lg:max-w-none">
                <figure>
                  <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                    <img
                      className="rounded-lg object-cover object-center shadow-lg"
                      src="/images/sample.png"
                      alt="Whitney leaning against a railing on a downtown street"
                      width={1184}
                      height={1376}
                    />
                  </div>
                </figure>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <h2 className="font-semibold uppercase tracking-wide text-purple">
                初めまして！
              </h2>
              <div className="mx-auto max-w-prose text-base lg:max-w-none">
                <p className="text-gray-500">
                  このアニメ部！に飛んできていただき、ありがとうございます！
                </p>
              </div>
              <div className="prose prose-indigo mx-auto mt-5 text-gray-500 lg:col-start-1 lg:row-start-1 lg:max-w-none">
                <p>本サービスは、アニメのレビューサイトです。</p>
                <p>
                  登録・ログインしていただき、アニメについて好きに点数をつけたり、感想を残したり、ただ鑑賞したという記録を残したり、気になっていたアニメをブックマークしたりと基本的な機能を備えております。
                </p>
                <p>
                  初めての個人開発Webアプリとなるため、手が行き届いていない場所があるかも知れませんが、あたたかく見守っていただけると幸いです。バグ報告などもお待ちしております！
                </p>
                <p>
                  管理人は、アニメが人生の軸となっており、本当に大好きです。初めての個人開発をする上で、楽しみながら制作するならなんだろなと考えたところアニメのレビューサイトとなりました。
                </p>
                <p>
                  「アニメ部！」というネーミングは、とりあえず付けて開発を続けていたところ、いつの間にか愛着が湧いていたので、そのまま使用しておりますが、後付けの所以は、学生時代に楽しくも辛くもがむしゃらに続けていた部活動のように、結局は好きだから続けていたという、そんな（？）アニメに対して気持ちがある方々が集える場になれば良いなと思っております！！！
                </p>
              </div>
            </div>
          </div>
        </div>
      </BackGroundWhite>
      <Breadcrumbs
        pages={[
          {
            name: 'アニメ部！について',
          },
        ]}
      />
    </>
  );
};

export default About;
About.getLayout = (page: ReactElement) => <LayoutNoNav>{page}</LayoutNoNav>;
