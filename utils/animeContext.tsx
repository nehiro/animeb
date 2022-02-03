import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Anime } from '../types/Anime';

type AnimeContextProps = {
  anime: Anime[] | undefined;
};

//箱を定義
const AnimeContext = createContext<AnimeContextProps>({ anime: undefined });

export const AnimeProvider = ({ children }: { children: ReactNode }) => {
  const [anime, setAnime] = useState();

  useEffect(() => {
    getAllAnimeTitles();
  }, []);

  async function getAllAnimeTitles() {
    const url = 'http://localhost:3000/api/animes';
    const response = await fetch(url, {
      method: 'GET',
    });

    const json = await response.json();
    // console.log('json', json);

    //全部のアニメ
    setAnime(json);
  }

  return (
    //中身を詰めて、箱を配る人を用意する
    <AnimeContext.Provider value={{ anime }}>{children}</AnimeContext.Provider>
  );
};

//箱を開ける作業
export const useAnime = () => {
  return useContext<AnimeContextProps>(AnimeContext);
};
