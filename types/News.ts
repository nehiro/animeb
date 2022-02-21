export type News = {
  id: string;
  title: string;
  body: {
    content: object[];
  };
  createdAt: number;
  updatedAt?: number;
};
