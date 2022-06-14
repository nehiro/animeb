import React, { ReactElement } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import LayoutNoNav from '../layouts/LayoutNoNav';
import Layout from '../layouts/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import BackGroundWhite from '../components/BackGroundWhite';
import SubpageTitle from '../components/SubpageTitle';

const Help = () => {
  const faqs01 = [
    {
      question: 'アカウントの作成',
      answer: `アニメ部！では、SNSログインのみを採用しております。画面右上の【登録・ログイン】をタップ（クリック）。【ご希望の認証SNSの登録・ログイン】をタップ（クリック）をしていただくと、お名前、メールアドレス、アイコン画像よりアニメ部！に登録致します。`,
    },
    {
      question: 'アカウントの削除（退会）',
      answer: `アニメ部！へログイン後、画面の右上に自分のアイコンをタップ(クリック)。「アカウント情報」を選択。「退会する」を選択。推移画面にて、退会が可能です。`,
    },
    {
      question: 'アニメ部！IDを変更したい',
      answer: '申し訳ございません。アニメ部！IDは変更できません。',
    },
  ];
  const faqs02 = [
    {
      question: 'ログインする',
      answer: `画面右上の【登録・ログイン】をタップ（クリック）。【ご希望の認証SNSの登録・ログイン】をタップ（クリック）をしていただくと、ログインが可能です。`,
    },
    {
      question: 'ログアウトする',
      answer: `アニメ部！へログイン後、画面の右上に自分のアイコンをタップ(クリック)。「ログアウト」を選択。`,
    },
  ];
  const faqs03 = [
    {
      question: 'アニメタイトルを検索',
      answer: `画面上部の【タイトル検索】をタップ（クリック）。現れる検索欄に探したいアニメのタイトルを入力してください。ひらがな、カタカナ、漢字、英数字を区別してご入力してください。`,
    },
    {
      question: 'マイページを確認',
      answer:
        'アニメ部！へログイン後、画面の右上に自分のアイコンをタップ(クリック)。「マイページ」を選択。アイコン、名前、自己紹介、watched、checked、following、followerが確認できます。',
    },
    {
      question: 'プロフィールの編集',
      answer:
        'アニメ部！へログイン後、画面の右上に自分のアイコンをタップ(クリック)。「プロフィールを編集」を選択。変更したい項目を変更後、【保存する】をタップ(クリック)。',
    },
    {
      question: 'アカウント情報の確認、変更',
      answer:
        'アニメ部！へログイン後、画面の右上に自分のアイコンをタップ(クリック)。「アカウント情報」を選択。情報を変更する場合、項目を選択。推移した画面にて変更後、【保存する】をタップ(クリック)。',
    },
    // {
    //   question: 'ベストアニメの設定',
    //   answer:
    //     'アニメ部！へログイン後、画面の右上に自分のアイコンをタップ(クリック)。「ベストアニメ設定」を選択。情報を変更する場合、項目を選択。推移した画面にて変更後、【保存する】をタップ(クリック)。',
    // },
    {
      question: '管理者を応援する',
      answer:
        'アニメ部！へログイン後、画面の右上に自分のアイコンをタップ(クリック)。「応援する」を選択。【応援する】ボタンををタップ(クリック)後に手続き。泣いて喜びます。',
    },
    {
      question: 'アニメにレビューする',
      answer:
        'アニメ部！へログイン後、画面の右上に自分のアイコンをタップ(クリック)。「応援する」を選択。【応援する】ボタンををタップ(クリック)後に手続き。泣いて喜びます。',
    },
    {
      question: '見たいアニメを登録する',
      answer:
        'アニメ部！へログイン後、画面の右上に自分のアイコンをタップ(クリック)。「応援する」を選択。【応援する】ボタンををタップ(クリック)後に手続き。泣いて喜びます。',
    },
    {
      question: 'アニメ情報を確認する',
      answer:
        'アニメ部！へログイン後、画面の右上に自分のアイコンをタップ(クリック)。「応援する」を選択。【応援する】ボタンををタップ(クリック)後に手続き。泣いて喜びます。',
    },
    {
      question: 'ユーザーをフォローする',
      answer:
        'アニメ部！へログイン後、画面の右上に自分のアイコンをタップ(クリック)。「応援する」を選択。【応援する】ボタンををタップ(クリック)後に手続き。泣いて喜びます。',
    },
  ];
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <>
      <Breadcrumbs />
      <BackGroundWhite>
        <SubpageTitle>ヘルプ</SubpageTitle>
        <div className="mb-3 rounded-md bg-gray-100 p-5">
          <h2 className="text-lg">
            アニメ部！の登録と利用の開始、退会について
          </h2>
          <dl className="space-y-4 divide-y divide-gray-200">
            {faqs01.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-5">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
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
        <div className="mb-3 rounded-md bg-gray-100 p-5">
          <h2 className="text-lg">ログイン、ログアウトについて</h2>
          <dl className="space-y-4 divide-y divide-gray-200">
            {faqs02.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-5">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
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
        <div className="rounded-md bg-gray-100 p-5">
          <h2 className="text-lg">機能について</h2>
          <dl className="space-y-4 divide-y divide-gray-200">
            {faqs03.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-5">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
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
    </>
  );
};

export default Help;
Help.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
