import useSWR, { mutate } from 'swr';
import { fetcher } from '../utils/fetcher';

const usePostData = (url: string, data: any) => {
  const key = JSON.stringify({ url, data });

  // useSWR with null fetcher to prevent automatic fetching
  const {
    data: responseData,
    error,
    isValidating,
  } = useSWR(key, null, {
    revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
    initialData: data,
  });

  // Manually trigger the POST request with this function
  const executePost = async () => {
    console.log(data);
    try {
      const response = await fetcher({
        url,
        method: 'POST',
        data,
        headers: { 'Content-Type': 'application/json' },
      });

      mutate(key, response, false);

      return !!response;
    } catch (error) {
      console.error('Error during POST request:', error);
      return false;
    }
  };

  return {
    data: responseData,
    error,
    isValidating,
    executePost,
  };
};

export default usePostData;
