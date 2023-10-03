import { appReduce, userReduce } from "../utiles/enums"

export const userToken = (payload: string) => ({
  type: userReduce.token,
  payload,
})
export const menuSelectKeys = (payload: string[]) => ({
  type: appReduce.selectedKeys,
  payload
})