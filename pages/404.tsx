import React, { ReactElement } from 'react';
import BackGroundWhite from '../components/BackGroundWhite';
import Button from '../components/Button';
import SubpageTitle from '../components/SubpageTitle';
import LayoutNoNav from '../layouts/LayoutNoNav';

const Custom404 = () => {
  return (
    <>
      <BackGroundWhite>
        <div className="text-center">
          <SubpageTitle>404 not found</SubpageTitle>
          <p className=" mb-8">お探しのページは見つかりませんでした。</p>
          <p className="mb-8">
            一時的にアクセスできない状況にあるか、移動もしくは削除された可能性があります。
          </p>
          <Button>トップページへ戻る</Button>
        </div>
      </BackGroundWhite>
    </>
  );
};

export default Custom404;

Custom404.getLayout = (page: ReactElement) => <LayoutNoNav>{page}</LayoutNoNav>;
