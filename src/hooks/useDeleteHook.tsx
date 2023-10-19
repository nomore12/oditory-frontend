import useSWR, { mutate } from 'swr';
import { fetcher } from '../utils/fetcher';

const useDeleteHook = (url: string) => {
  const key = url; // DELETE 요청의 경우 URL만 키로 사용합니다.

  const {
    data: responseData,
    error,
    isValidating,
  } = useSWR(key, null, {
    // 초기 호출은 하지 않기 위해 fetcher 대신 null을 전달합니다.
    revalidateOnMount: false,
    shouldRetryOnError: false,
  });

  const executeDelete = async () => {
    try {
      const response = await fetcher({
        url,
        method: 'DELETE',
      });
      console.log('response', response);

      // 데이터를 갱신하기 위해 mutate를 사용합니다.
      mutate(key, null, false);

      // response가 undefined인지 확인
      if (!response) {
        return true;
      } else {
        console.error('Unexpected response:', response);
        return false;
      }
    } catch (error) {
      console.error('Error during DELETE request:', error);
      return false;
    }
  };

  return {
    data: responseData,
    error,
    isValidating,
    executeDelete,
  };
};

export default useDeleteHook;
