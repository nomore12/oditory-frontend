import useSWR, { mutate } from 'swr';
import { fetcher } from '../utils/fetcher';

const usePatchHook = (url: string, initialData: any) => {
  const key = JSON.stringify({ url, data: initialData });

  const {
    data: responseData,
    error,
    isValidating,
  } = useSWR(key, null, {
    // 초기 호출은 하지 않기 위해 fetcher 대신 null을 전달합니다.
    revalidateOnMount: false,
    shouldRetryOnError: false,
  });

  const executePatch = async (updatedData: any) => {
    console.log(updatedData);
    try {
      const response = await fetcher({
        url,
        method: 'PATCH',
        data: updatedData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      mutate(key, response, false);

      if (response) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error during PUT request:', error);
      return false;
    }
  };

  return {
    data: responseData,
    error,
    isValidating,
    executePut: executePatch,
  };
};

export default usePatchHook;
