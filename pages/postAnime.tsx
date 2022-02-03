import { collection, doc, setDoc } from 'firebase/firestore';
import React, { ReactElement } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Layout from '../layouts/Layout';
import { Anime } from '../types/Anime';
import { db } from '../utils/firebase';

const PostAnime = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Anime>();

  const onSubmit: SubmitHandler<Anime> = async (data) => {
    console.log(data.cast);
    const ref = doc(collection(db, 'animes'));
    const id = ref.id;
    const newPost: Anime = {
      ...data,
      id,
    };
    console.log(newPost);
    await setDoc(doc(db, `animes/${id}`), newPost).then(() => alert('登録'));
  };

  return (
    <section>
      <div className="container">
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <ul className="grid grid-cols-2 gap-4">
            {/* <li className="mb-4">
              <label className="block mb-2" htmlFor="id">
                id
              </label>
              <input
                type="text"
                {...register('id')}
                id="id"
                className="w-full"
              />
            </li> */}
            <li className="mb-4">
              <label className="block mb-2" htmlFor="doing">
                doing
              </label>
              <input
                type="checkbox"
                {...register('doing')}
                id="doing"
                className=""
              />
            </li>
            <li className="mb-4">
              <label className="block mb-2" htmlFor="media">
                media
              </label>
              <select {...register('media')} id="media" className="w-full">
                <option value="tv">tv</option>
                <option value="movie">movie</option>
                <option value="net">net</option>
              </select>
            </li>
            <li className="mb-4">
              <label className="block mb-2" htmlFor="firstTime">
                firstTime
              </label>
              <input
                type="number"
                {...register('firstTime')}
                id="firstTime"
                className="w-full"
              />
            </li>
            <li className="mb-4">
              <label className="block mb-2" htmlFor="season">
                season
              </label>
              <select {...register('season')} id="season" className="w-full">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </li>
            <li className="mb-4">
              <label className="block mb-2" htmlFor="title">
                title
              </label>
              <input
                type="text"
                {...register('title')}
                id="title"
                className="w-full"
              />
            </li>
            <li className="mb-4">
              <label className="block mb-2" htmlFor="ruby">
                ruby
              </label>
              <input
                type="text"
                {...register('ruby')}
                id="ruby"
                className="w-full"
              />
            </li>
            <li className="mb-4">
              <label className="block mb-2" htmlFor="pv">
                pv
              </label>
              <input
                type="text"
                {...register('pv')}
                id="pv"
                className="w-full"
              />
            </li>
            <li className="mb-4">
              <label className="block mb-2" htmlFor="year">
                year
              </label>
              <input
                type="number"
                {...register('year')}
                id="year"
                className="w-full"
              />
            </li>
            <li className="mb-4">
              <label className="block mb-2" htmlFor="quarter">
                quarter
              </label>
              <select {...register('quarter')} id="quarter" className="w-full">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </li>
            <li className="mb-4">
              <label className="block mb-2" htmlFor="staff">
                staff
              </label>
              <input
                type="text"
                {...register('staff')}
                id="staff"
                className="w-full"
              />
            </li>
            <li className="mb-4">
              <label className="block mb-2" htmlFor="op">
                op
              </label>
              <input
                type="text"
                {...register('op')}
                id="op"
                className="w-full"
              />
            </li>
            <li className="mb-4">
              <label className="block mb-2" htmlFor="ed">
                ed
              </label>
              <input
                type="text"
                {...register('ed')}
                id="ed"
                className="w-full"
              />
            </li>
            <li className="mb-4">
              <label className="block mb-2" htmlFor="summary">
                summary
              </label>
              <textarea
                {...register('summary')}
                id="summary"
                className="w-full"
              />
            </li>
            <li className="mb-4">
              <label className="block mb-2" htmlFor="cast">
                cast
              </label>
              <input
                type="text"
                {...register('cast')}
                id="cast"
                className="w-full"
              />
            </li>
            <li className="mb-4">
              <label className="block mb-2" htmlFor="subTitle">
                subTitle
              </label>
              <input
                type="text"
                {...register('subTitle')}
                id="subTitle"
                className="w-full"
              />
            </li>
            <li className="mb-4">
              <label className="block mb-2" htmlFor="onair">
                onair
              </label>
              <input
                type="text"
                {...register('onair')}
                id="onair"
                className="w-full"
              />
            </li>
            <li className="mb-4">
              <label className="block mb-2" htmlFor="streaming">
                streaming
              </label>
              <input
                type="text"
                {...register('streaming')}
                id="streaming"
                className="w-full"
              />
            </li>
            <li className="mb-4 text-center col-span-2">
              <button className="bg-buttonBlack rounded-full py-3 px-12 text-white mx-auto inline-block relative">
                送信
              </button>
            </li>
          </ul>
        </form>
      </div>
    </section>
  );
};

export default PostAnime;
PostAnime.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
