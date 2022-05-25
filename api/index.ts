import axios from "axios";
import useAxios from "axios-hooks";
import { StarshipType } from "../types";

export const useApiGetStarships = (page = 1) =>
  useAxios({
    url: "/starships",
    params: {
      page,
    },
  });

export const apiGetStarships = async (page = "1") => {
  let next = "true";
  let p: string | null = page;
  let starships: StarshipType[] = [];

  while (next) {
    const response: any = await axios({
      url: "/starships",
      params: {
        page: p,
      },
    });
    next = response.data.next;
    starships = [...starships, ...response.data.results];
    if (!next) break;
    const url = new URL(next);
    const urlParams = new URLSearchParams(url.searchParams);
    p = urlParams.get("page");
  }
  return starships;
};
