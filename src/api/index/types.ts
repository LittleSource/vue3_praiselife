import { service } from "../service/types";
export interface bannerRes {
  bannerList: banner[];
}

export interface banner {
  id: number;
  image: string;
  url: string;
}

export interface serviceRes {
  hotList: service[];
  generalList: service[];
}
