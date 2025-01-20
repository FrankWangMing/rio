import http from '../http';

export default (data: any) => {
  return http.get('/data', {
    data,
  });
};
