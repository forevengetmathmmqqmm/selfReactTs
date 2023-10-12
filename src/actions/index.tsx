import { appReduce, userReduce } from "../utils/enums"
import { userInfoInter } from "../utils/inter"

export const userToken = (payload: string) => ({
  type: userReduce.token,
  payload,
})
export const userInfoAct = (payload: userInfoInter) => ({
  type: userReduce.userInfo,
  payload
})

export const userIdAct = (payload: string) => ({
  type: userReduce.userId,
  payload
})

export const menuSelectKeys = (payload: string[]) => ({
  type: appReduce.selectedKeys,
  payload
})