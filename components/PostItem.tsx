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
import toast from 'react-hot-toast';

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
      toast.error('ログインしてください');
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
      toast.error('ログインしてください');
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
    <div className="flex py-3">
      <div className="mr-4">
        <img src={user?.photoURL} alt="" className="h-10 w-10 rounded-full" />
      </div>
      <div>
        <p className="text-sm">
          <span className="mr-2 font-bold">{user?.name}</span>
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
              <HeartFillIcon className="h-5 w-5 text-pink-500" />
            ) : (
              <HeartIcon className="h-5 w-5 text-gray-400 hover:text-pink-500" />
            )}
            <span
              className={classNames(
                'ml-1 text-sm',
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
