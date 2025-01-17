import http from '../http';

interface UserInfo {
  user(): void;
}

export default (): PromiseLike<UserInfo> => {
  return http.get('/user');
};
