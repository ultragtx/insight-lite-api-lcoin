
import * as fetch from 'isomorphic-fetch';

const fetchWrapper = (method: string) => (url: string, body?: any, auth?: string, isJSON = true) => {

  console.log(url);
  let headers: any = {};

  headers['Accept'] = 'application/json';
  headers['Content-Type'] = 'application/json';
  if (auth) headers['Authorization'] = auth;

  let opt: any = {};
  opt.method = method;
  opt.headers = headers;
  if (body) opt.body = isJSON ? JSON.stringify(body) : body;

  return fetch(url, opt).then(res => res.json());
}

export default {
  get: fetchWrapper('GET'),
  post: fetchWrapper('POST'),
  put: fetchWrapper('PUT'),
  patch: fetchWrapper('PATCH'),
  delete: fetchWrapper('DELETE')
};
