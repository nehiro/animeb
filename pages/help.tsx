import React, { ReactElement } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import LayoutNoNav from '../layouts/LayoutNoNav';
import Layout from '../layouts/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import BackGroundWhite from '../components/BackGroundWhite';
import SubpageTitle from '../components/SubpageTitle';
import { NextSeo } from 'next-seo';

const Help = () => {
  const faqs01 = [
    {
      question: 'アカウントの作成',
      answer: `アニメ部！では、SNSログインのみを採用しております。画面右上の【登録・ログイン】を選択。【ご希望の認証SNSの登録・ログイン】を選択をしていただくと、お名前、メールアドレス、アイコン画像よりアニメ部！に登録致します。`,
    },
    {
      question: '複数のアカウント作成が出来ない',
      answer: `複数のSNSでアカウントを作成する場合、それぞれのSNSで同一のメールアドレスを使用しているとアカウント作成できません。`,
    },
    {
      question: 'アカウントの削除（退会）',
      answer: `アニメ部！へログイン後、画面の右上に自分のアイコンを選択。「アカウント情報」を選択。「退会する」を選択。推移画面にて、退会が可能です。`,
    },
    {
      question: 'アニメ部！IDを変更したい',
      answer: '申し訳ございません。アニメ部！IDは変更できません。',
    },
  ];
  const faqs02 = [
    {
      question: 'ログインする',
      answer: `画面右上の【登録・ログイン】を選択。【ご希望の認証SNSの登録・ログイン】を選択をしていただくと、ログインが可能です。`,
    },
    {
      question: 'ログアウトする',
      answer: `アニメ部！へログイン後、画面の右上に自分のアイコンを選択。「ログアウト」を選択。`,
    },
  ];
  const faqs03 = [
    {
      question: 'アニメタイトルを検索',
      answer: `画面上部の【タイトル検索】を選択。現れる検索欄に探したいアニメのタイトルを入力してください。ひらがな、カタカナ、漢字、英数字を区別してご入力ください。`,
    },
    {
      question: 'マイページを確認',
      answer:
        'アニメ部！へログイン後、画面の右上に自分のアイコンを選択。「マイページ」を選択。アイコン、名前、自己紹介、watched、checked、following、followerが確認できます。',
    },
    {
      question: 'プロフィールの編集',
      answer:
        'アニメ部！へログイン後、画面の右上に自分のアイコンを選択。「プロフィールを編集」を選択。変更したい項目を変更後、【保存する】を選択。',
    },
    {
      question: 'アカウント情報の確認、変更',
      answer:
        'アニメ部！へログイン後、画面の右上に自分のアイコンを選択。「アカウント情報」を選択。情報を変更する場合、項目を選択。推移した画面にて変更後、【保存する】を選択。',
    },
    // {
    //   question: 'ベストアニメの設定',
    //   answer:
    //     'アニメ部！へログイン後、画面の右上に自分のアイコンを選択。「ベストアニメ設定」を選択。情報を変更する場合、項目を選択。推移した画面にて変更後、【保存する】を選択。',
    // },
    {
      question: '管理者を応援する',
      answer:
        'アニメ部！へログイン後、画面の右上に自分のアイコンを選択。「応援する」を選択。【応援する】ボタンをを選択後に手続き。泣いて喜びます。',
    },
    {
      question: 'アニメにレビューする',
      answer:
        '該当アニメ画像の左下にある目のアイコンを選択。スコア、コメント、タグやネタバレの有無をお好みで設定の上、投稿してください。',
    },
    {
      question: 'アニメのレビューを削除または更新する',
      answer:
        '該当アニメ画像の下にある目のアイコンを選択。削除の場合は、削除ボタンを選択。更新の場合は、該当箇所を変更後に、更新ボタンを選択。',
    },
    {
      question: '見たいアニメを登録する',
      answer: '該当アニメ画像の下にある栞のアイコンを選択。',
    },
    {
      question: '見たいアニメを削除する',
      answer: '該当アニメ画像の下にある栞のアイコンを選択。',
    },
    {
      question: 'アニメ情報を確認する',
      answer:
        '該当アニメの写真または、タイトル名を選択。アニメ情報だけではなく、ユーザーのレビュー内容も確認できます。',
    },
    {
      question: 'ユーザーをフォローする。フォローから外す',
      answer:
        '該当のユーザーページに飛び、名前の横にある【フォロー】ボタンを押す。外す場合は、マイページのfollowerからも可能です。',
    },
  ];
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <>
      <NextSeo
        title="ヘルプ | アニメ部！"
        description="アニメ部！の使い方"
        openGraph={{
          url: 'https://anime-club.online/help',
          title: 'ヘルプ | アニメ部！',
          description: 'アニメ部！の使い方',
        }}
      />
      <Breadcrumbs
        pages={[
          {
            name: 'ヘルプ',
          },
        ]}
      />
      <BackGroundWhite>
        <SubpageTitle>ヘルプ</SubpageTitle>
        <div className="mb-3 rounded-md bg-gray-50 p-5">
          <h2 className="text-base font-medium">
            アニメ部！の登録と利用の開始、退会について
          </h2>
          <dl className="space-y-4 divide-y divide-gray-200">
            {faqs01.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-5">
                {({ open }) => (
                  <>
                    <dt className="text-base">
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
                        <span className="text-base text-purple">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          <ChevronDownIcon
                            className={classNames(
                              open ? '-rotate-180' : 'rotate-0',
                              'h-6 w-6 transform'
                            )}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base text-gray-500">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
        <div className="mb-3 rounded-md bg-gray-50 p-5">
          <h2 className="text-base font-medium">
            ログイン、ログアウトについて
          </h2>
          <dl className="space-y-4 divide-y divide-gray-200">
            {faqs02.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-5">
                {({ open }) => (
                  <>
                    <dt className="text-base">
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
                        <span className="text-base text-purple">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          <ChevronDownIcon
                            className={classNames(
                              open ? '-rotate-180' : 'rotate-0',
                              'h-6 w-6 transform'
                            )}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base text-gray-500">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
        <div className="rounded-md bg-gray-50 p-5">
          <h2 className="text-base font-medium">機能について</h2>
          <dl className="space-y-4 divide-y divide-gray-200">
            {faqs03.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-5">
                {({ open }) => (
                  <>
                    <dt className="text-base">
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
                        <span className="text-base text-purple">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          <ChevronDownIcon
                            className={classNames(
                              open ? '-rotate-180' : 'rotate-0',
                              'h-6 w-6 transform'
                            )}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base text-gray-500">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </BackGroundWhite>
      <Breadcrumbs
        pages={[
          {
            name: 'ヘルプ',
          },
        ]}
      />
    </>
  );
};

export default Help;
Help.getLayout = (page: ReactElement) => <LayoutNoNav>{page}</LayoutNoNav>;
