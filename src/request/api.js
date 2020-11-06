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
export function getRightsList() {
  return axios({
    url:`${basURL}rights/list`,
    method:'get'
  })
}
export function getRightsTree() {
  return axios({
    url:`${basURL}rights/tree`,
    method:'get'
  })
}
export function deleteRight(params) {
   return axios({
     url:`${basURL}roles/${params.roleId}/rights/${params.rightId}`,
     method:'delete',
   })
}
export function rolesrights(roleId,params) {
  return axios({
    url:`${basURL}roles/${roleId}/rights`,
    method:'post',
    data:params
  })
}

export function deleteRole(params) {
  return axios({
    url:`${basURL}roles/${params}`,
    method:'delete'
  })
  
}
export function queryRoleList() {
  return axios({
    url:`${basURL}roles`,
    method:'get'
  })
}

export function userRole(params) {
  return axios({
    url:`${basURL}users/${params.id}/role`,
    method:'put',
    data:params
  })
}

export function getCatgoryList(params) {
  return axios({
    url:`${basURL}categories`,
    method:'get',
    params
  })
}
export function addCategories(params) {
  return axios({
    url:`${basURL}categories`,
    method:'post',
    data:params
  })
}
export function getAttributes(id,params) {
  return axios({
    url:`${basURL}categories/${id}/attributes`,
    method:'get',
    params
  })
}
export function addNewAttr(id,params) {
  return axios({
    url:`${basURL}categories/${id}/attributes`,
    method:'post',
    data:params
  })
  
}
export function deleteAttrVal(id,attrid) {
  return axios({
    url:`${basURL}categories/${id}/attributes/${attrid}`,
    method:'delete'
  })
}
export function editAttrVal(ids,params) {
  return axios({
    url:`${basURL}categories/${ids.id}/attributes/${ids.attrId}`,
    method:'put',
    data:params
  })
}
export function editParams(ids,params) {
  return axios({
    url:`${basURL}categories/${ids.id}/attributes/${ids.attrId}`,
    method:'put',
    data:params
  })
}