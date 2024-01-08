import request from "../utils/request";
// 登录
interface LoginInter {
  nickname: string
  password: string
}
export function loginApi(data: LoginInter) {
  return request({
    url: '/user/login',
    method: 'POST',
    data: data,
  })
}

// 登出
export function logoutApi() {
  return request({
    url: '/user/logout',
    method: 'POST',
  })
}

// 详情
export function userDetailApi(id:string | number) {
  return request({
    url: `/user/userInfo/${id}`,
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
    url: '/user/userInfo',
    method: 'POST',
    data: data,
  })
}

// 创建钱包
export interface WalletInter {
  wallet_address: string
  keystore: string
}
export function walletApi(data: WalletInter) {
  return request({
    url: '/comment/wallet',
    method: 'POST',
    data: data,
  })
}

// 获取用户列表
export function userListApi() {
  return request({
    url: '/user/userInfo/list',
    method: 'GET',
  })
}