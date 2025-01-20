import http from '../http';

export default (data: any) => {
  return http.post('/update', {
    data,
  });
};
