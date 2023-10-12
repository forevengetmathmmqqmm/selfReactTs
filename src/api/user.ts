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