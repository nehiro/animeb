export type User = {
  bd: string | undefined;
  email: string;
  gender: 'male' | 'female' | 'noAnswer' | null;
  name: string;
  uid: string;
  photoURL: string;
  intro: string | undefined;
  followCount: number;
  followerCount: number;
  createdAt: number;
  ranking: object[];
};
