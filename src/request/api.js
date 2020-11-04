import axios from './http';

let basURL = 'http://127.0.0.1:8888/api/private/v1/'

export function login(data) {
  return axios({
    url:`${basURL}login`,
    method:'post',
    data
  })
}