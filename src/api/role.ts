import request from "../utils/request";

// 修改角色
export interface RoleInter {
  id?: number
  title: string
  desc: string
}
export function editRoleApi(data: RoleInter) {
  return request({
    url: '/role/edit',
    method: 'POST',
    data: data,
  })
}

// 获取用户列表
export function roleListApi() {
  return request({
    url: '/role/list',
    method: 'GET',
  })
}

// 删除
export function roleDelApi(id:string | number) {
  return request({
    url: `/role/del/${id}`,
    method: 'DELETE',
  })
}