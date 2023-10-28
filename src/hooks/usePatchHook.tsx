import useSWR, { mutate } from 'swr';
import { fetcher } from '../utils/fetcher';

const usePatchHook = (url: string, data: any, contentType: any) => {
  const key = JSON.stringify({ url, data });

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

  const executePatch = async (updatedData: any) => {
    try {
      const response = await fetcher({
        url,
        method: 'PATCH',
        data: updatedData,
        headers: contentType,
      });

      mutate(key, response, false);

      return !!response;
    } catch (error) {
      console.error('Error during PUT request:', error);
      return false;
    }
  };

  return {
    data: responseData,
    error,
    isValidating,
    executePatch,
  };
};

export default usePatchHook;
