import axios from './http';

let basURL = 'http://127.0.0.1:8888/api/private/v1/'

export function login(data) {
  return axios({
    url: `${basURL}login`,
    method: 'post',
    data
  })
}

export function getMenus() {
  return axios({
    url: `${basURL}menus`,
    method: 'get',
  })
}
export function getUsers(data) {
  return axios({
    url: `${basURL}users`,
    method: 'get',
    params:  data
  })
}
export function switchUserStatus(params) {
  return axios({
    url:`${basURL}users/${params.id}/state/${params.mg_state}`,
    method:'put'
  })
}
export function addNewUser(data) {
  return axios({
    url:`${basURL}users`,
    method:'post',
    data
  })
}
export function editUserInfo(data) {
  return axios({
    url:`${basURL}users/${data.id}`,
    method:'put',
    data
  })
}
export function deleteUser(data) {
  return axios({
    url:`${basURL}users/${data.id}`,
    method:'delete',
  })
}
export function getRolersList() {
  return axios({
    url:`${basURL}roles`,
    method:'get'
  })
}