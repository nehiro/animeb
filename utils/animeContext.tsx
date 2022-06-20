import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Anime, JsonAnime } from '../types/Anime';

type AnimeContextProps = {
  animes: Anime[] | undefined;
};

//箱を定義
const AnimeContext = createContext<AnimeContextProps>({ animes: undefined });

export const AnimeProvider = ({ children }: { children: ReactNode }) => {
  const [animes, setAnimes] = useState<Anime[]>();
  // console.log(animes, 'animes');

  useEffect(() => {
    getAllAnimeTitles();
  }, []);

  async function getAllAnimeTitles() {
    const url = '/api/animes';
    const response = await fetch(url, {
      method: 'GET',
    });
    // console.log(response, 'response');

    const json = await response.json();
    // console.log(json, 'json');

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
