import request from "@/utils/request"

export const getParentAccessListApi = () => {
  return request({
    url: '/access/parent/list',
    method: 'GET',
  })
}

export interface ParentAccess {
  id?: number
  path: string
  el_path: string
  has_children?: number
  name: string
  show: number
  icon?: string
}
export const addParentAccessApi = (data: ParentAccess) => {
  return request({
    url: '/access/parent/add',
    method: 'POST',
    data,
  })
}

export const editParentAccessApi = (data: ParentAccess) => {
  return request({
    url: '/access/parent/edit',
    method: 'POST',
    data,
  })
}

// 删除
export function delAccessParentApi(id: number) {
  return request({
    url: '/access/parent/del/'+id,
    method: 'DELETE',
  })
}
// 详情
export function detailAccessParentApi(id: number) {
  return request({
    url: '/access/parent/detail/'+id,
    method: 'GET',
  })
}

export const getAccessList = () => {
  return request({
    url: '/access/list',
    method: 'GET',
  })
}

export interface Access {
  id?: number
  path: string
  el_path: string
  name: string
  show: number
  icon?: string
  parentRouterId: number
  roleId: number[]
}
export const addAccessApi = (data: Access) => {
  return request({
    url: '/access/add',
    method: 'POST',
    data,
  })
}

export const editAccessApi = (data: Access) => {
  return request({
    url: '/access/edit',
    method: 'POST',
    data,
  })
}

// 删除
export function delAccessApi(id: number) {
  return request({
    url: '/access/del/'+id,
    method: 'DELETE',
  })
}
// 详情
export function detailAccessApi(id: number) {
  return request({
    url: '/access/detail/'+id,
    method: 'GET',
  })
}