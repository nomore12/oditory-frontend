import axios, { Method } from 'axios';

// 오리진 URL 설정
const BASE_URL = 'http://127.0.0.1:8000/api/';
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
