import request from "../utils/request";
// 登录、注册
interface LoginInter {
  nickname: string
  password: string
}
export function loginApi(data: LoginInter) {
  return request({
    url: '/login',
    method: 'POST',
    data: data,
  })
}

// 详情
export function userDetailApi(id:string | number) {
  return request({
    url: `/user/${id}`,
    method: 'GET',
  })
}

// 修改用户
export interface UserInter {
  id: number
  nickname: string
  phone: string
  email: string
  wallet_address: string
  address: string
  intro: string
  avatar: string
}
export function editUserApi(data: UserInter) {
  return request({
    url: '/user',
    method: 'POST',
    data: data,
  })
}