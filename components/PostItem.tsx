import { formatDistanceToNow } from 'date-fns';
import { HeartIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartFillIcon } from '@heroicons/react/solid';
import { ja } from 'date-fns/locale';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { useAuth } from '../utils/userContext';
import { db } from '../utils/firebase';
import { classNames } from '../lib/classNames';
import { useUser } from '../lib/user';
import { Post } from '../types/post';
import { useState } from 'react';

const PostItem = ({ hit }: { hit: Post }) => {
  const user = useUser(hit.authorId);
  const { user: authUser, likeIds } = useAuth();
  const [likeCount, setLikeCount] = useState<number>(hit.likeCount);

  if (!user) return null;

  const isLiked = () => {
    return likeIds?.includes(hit.id);
  };

  const like = async () => {
    if (!authUser) {
      alert('ログインしてください');
    }

    setLikeCount((count) => count + 1);

    const ref = doc(db, `users/${authUser?.uid}/likes/${hit.id}`);
    await setDoc(ref, {
      createdAt: Date.now(),
    });

    const postRef = doc(db, `posts/${hit.id}`);
    await updateDoc(postRef, {
      likeCount: increment(1),
    });
  };

  const unlike = async () => {
    if (!authUser) {
      alert('ログインしてください');
    }

    setLikeCount((count) => count - 1);

    const ref = doc(db, `users/${authUser?.uid}/likes/${hit.id}`);
    await deleteDoc(ref);

    const postRef = doc(db, `posts/${hit.id}`);
    await updateDoc(postRef, {
      likeCount: increment(-1),
    });
  };

  return (
    <div className="py-3 flex">
      <div className="mr-4">
        <img src={user?.photoURL} alt="" className="w-10 h-10 rounded-full" />
      </div>
      <div>
        <p className="text-sm">
          <span className="font-bold mr-2">{user?.name}</span>
          <span className="opacity-60">
            {formatDistanceToNow(hit.createdAt, {
              locale: ja,
              addSuffix: true,
            })}
          </span>
        </p>
        <p>{hit.body}</p>
        <div>
          <button
            onClick={() => {
              if (isLiked()) {
                unlike();
              } else {
                like();
              }
            }}
            className="flex items-center"
          >
            {isLiked() ? (
              <HeartFillIcon className="w-5 h-5 text-pink-500" />
            ) : (
              <HeartIcon className="w-5 h-5 text-gray-400 hover:text-pink-500" />
            )}
            <span
              className={classNames(
                'text-sm ml-1',
                isLiked() ? 'text-pink-500' : 'text-gray-500'
              )}
            >
              {likeCount}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
