import { store } from 'hooks';

const useLoginCheck = (): boolean => {
  const accessToken = store.getState().auth.accessToken;
  // console.log(accessToken, !!accessToken);

  return !!accessToken; // 인증 여부를 boolean 값으로 반환
};

export default useLoginCheck;
