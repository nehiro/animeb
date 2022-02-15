import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Anime } from '../types/Anime';

type AnimeContextProps = {
  animes: Anime[] | undefined;
};

//箱を定義
const AnimeContext = createContext<AnimeContextProps>({ animes: undefined });

export const AnimeProvider = ({ children }: { children: ReactNode }) => {
  const [animes, setAnimes] = useState();

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
    setAnimes(json.items);
  }

  return (
    //中身を詰めて、箱を配る人を用意する
    <AnimeContext.Provider value={{ animes }}>{children}</AnimeContext.Provider>
  );
};

//箱を開ける作業
export const useAnime = () => {
  return useContext<AnimeContextProps>(AnimeContext);
};
