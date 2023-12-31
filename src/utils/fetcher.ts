import axios, { Method } from 'axios';
import * as process from 'process';

// 오리진 URL 설정
const BASE_URL = process.env.REACT_APP_BACKEND_HOST;
axios.defaults.baseURL = BASE_URL;

interface FetcherArgs {
  url: string;
  method?: Method; // 'GET', 'POST', 'PUT', 'DELETE' 등
  data?: any;
  headers?: Record<string, string>;
}

export const fetcher = async ({
  url,
  method = 'GET',
  data,
  headers,
}: FetcherArgs) => {
  const response = await axios({
    url,
    method,
    data,
    headers,
  });
  return response.data;
};
