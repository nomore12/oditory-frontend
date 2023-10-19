import useSWR, { mutate } from 'swr';
import { fetcher } from '../utils/fetcher';

const usePostData = (url: string, data: any) => {
  const key = JSON.stringify({ url, data }); // POST 요청의 경우, URL과 함께 데이터도 키로 사용합니다.

  const {
    data: responseData,
    error,
    isValidating,
  } = useSWR(key, () => fetcher({ url, method: 'POST', data }), {
    revalidateOnMount: false, // 첫 렌더링에서는 자동으로 POST 요청을 보내지 않습니다.
    shouldRetryOnError: false, // 실패한 POST 요청은 자동으로 재시도하지 않습니다.
  });

  // 요청을 수동으로 트리거하기 위한 함수
  const executePost = async () => {
    try {
      const response = await fetcher({
        url,
        method: 'POST',
        data,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      mutate(key, response, false); // SWR의 mutate를 사용하여 데이터를 갱신

      console.log('response', response);

      return !!(response && response.image);
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
