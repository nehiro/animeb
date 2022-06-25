// export type Anime = {
//   id?: string;
//   doing: boolean;
//   media: string;
//   firstTime: boolean;
//   season: number;
//   title: string;
//   ruby: string;
//   url: string;
//   pv: string | null;
//   year: number;
//   quarter: number;
//   staff: string[][];
//   op: string[];
//   ed: string[];
//   summary: string;
//   cast: string[][];
//   subTitle: string[];
//   onair: string[][];
//   streaming: string[];
// };
export type Anime = {
  id?: string;
  doing: boolean;
  media: string;
  firstTime: boolean;
  season: number;
  title: string;
  ruby: string;
  url: string;
  pv: string | null;
  year: number;
  quarter: number;
  staff: string[][];
  op: string[] | null;
  ed: string[] | null;
  summary: string | null;
  cast: string[][];
  subTitle: string[] | null;
  onair: string[][] | string[] | null;
  streaming: string[] | null;
};
export type JsonAnime = {
  id?: string;
  doing: boolean;
  media: string;
  firstTime: boolean;
  season: number;
  title: string;
  ruby: string;
  url: string;
  pv: string | null;
  year: number;
  quarter: number;
  staff: string[][];
  op: string[] | null;
  ed: string[] | null;
  summary: string | null;
  cast: string[][];
  subTitle: string[] | null;
  onair: string[][] | string[] | null;
  streaming: string[] | null;
};
