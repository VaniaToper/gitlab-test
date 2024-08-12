import axios from "axios";
import { DEFAULT_PAGE_SIZE } from "../constants/constants";

export const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.API_ACCESS_TOKEN}`,
    "PRIVATE-TOKEN": process.env.API_ACCESS_TOKEN,
  },
});

export const fetchAllPagesOfEntity = async <T>(
  endPoint: string
): Promise<{ data: T[] }> => {
  let page = 1;
  let hasNextPage = true;
  const allData: T[] = [];

  while (hasNextPage) {
    const response = await api.get<T[]>(endPoint, {
      params: {
        per_page: DEFAULT_PAGE_SIZE,
        page,
      },
    });

    allData.push(...response.data);
    hasNextPage = response.data.length >= DEFAULT_PAGE_SIZE;
    page++;
  }

  return { data: allData };
};
