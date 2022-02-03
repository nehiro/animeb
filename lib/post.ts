import { Post } from '../types/post';

export const savePostToAlgolia = (post: Post, token: string) => {
  return fetch('/api/post', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(post),
  });
};
