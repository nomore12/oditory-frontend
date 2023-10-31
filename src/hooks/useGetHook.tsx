import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';

const useGetData = (url: string, headers?: Record<string, string>) => {
  const { data, error, mutate } = useSWR(url, (url: string) =>
    fetcher({ url, headers })
  );

  return {
    data,
    error,
    mutate,
  };
};

export default useGetData;
