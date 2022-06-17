import React, { ReactElement } from 'react';
import BackGroundWhite from '../components/BackGroundWhite';
import Breadcrumbs from '../components/Breadcrumbs';
import SubpageTitle from '../components/SubpageTitle';
import LayoutNoNav from '../layouts/LayoutNoNav';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface IFormInput {
  to: string;
  name: string;
  contents: string;
}

const Contact = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onChange',
  });

  const submit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    fetch('/api/send-mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(async (response) => {
      if (response.status === 200) {
        toast.success(await response.text());
        reset();
      } else {
        toast.error(await response.text());
      }
    });
  };
  return (
    <>
      <Breadcrumbs
        pages={[
          {
            name: 'お問い合わせ',
          },
        ]}
      />
      <BackGroundWhite>
        <SubpageTitle>お問い合わせ</SubpageTitle>
        <form onSubmit={handleSubmit(submit)}>
          <div className="mb-4">
            {' '}
            <label>
              <span className="block">メールアドレス</span>
              <input
                {...register('to', {
                  required: true,
                })}
                type="email"
                autoComplete="email"
                required
                className="mt-2 w-full rounded border bg-transparent"
              />
              {errors.to?.type === 'required' && (
                <p className="mt-2 text-red-600">
                  メールアドレスを入力してください。
                </p>
              )}
            </label>
          </div>
          <div className="mb-4">
            <label>
              <span className="block">お名前</span>
              <input
                {...register('name', {
                  required: true,
                  maxLength: 20,
                })}
                type="text"
                autoComplete="name"
                className="mt-2 w-full rounded border bg-transparent"
                required
              />
              {errors.name?.type === 'required' && (
                <p className="mt-2 text-red-600">お名前を入力してください。</p>
              )}
              {errors.name?.type === 'maxLength' && (
                <p className="mt-2 text-red-600">
                  20文字以内で入力してください。
                </p>
              )}
            </label>
          </div>

          <label>
            <span className="block">お問い合わせ内容</span>
            <textarea
              {...register('contents', {
                required: true,
                maxLength: 1000,
              })}
              className="mt-2 h-32 w-full rounded border bg-transparent"
              required
            />
            {errors.contents?.type === 'required' && (
              <p className="mt-2 text-red-600">
                お問い合わせ内容を入力してください。
              </p>
            )}
            {errors.contents?.type === 'maxLength' && (
              <p className="mt-2 text-red-600">
                1000文字以内で入力してください。
              </p>
            )}
          </label>
          <div className="text-center">
            <button className="relative mx-auto mt-8 inline-block cursor-pointer rounded-full bg-buttonBlack py-3 px-12 font-normal text-white transition duration-200 ease-in-out hover:bg-yellow hover:font-bold hover:text-buttonBlack">
              送信
            </button>
          </div>
        </form>
      </BackGroundWhite>

      <Breadcrumbs
        pages={[
          {
            name: 'お問い合わせ',
          },
        ]}
      />
    </>
  );
};

export default Contact;
Contact.getLayout = (page: ReactElement) => <LayoutNoNav>{page}</LayoutNoNav>;
