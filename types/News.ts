export type News = {
  id: string;
  title: string;
  category: string;
  body: {
    content: object[];
  };
  createdAt: number;
  updatedAt?: number;
};
