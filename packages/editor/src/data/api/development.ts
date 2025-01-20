import http from '../http';

export default (data: any) => {
  return http.post('/development', {
    data,
  });
};
