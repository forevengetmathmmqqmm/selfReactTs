import { userReduce } from "../utils/enums";
import { userInfoInter } from "../utils/inter";
interface UserStateInter {
  token: string
  userInfo: userInfoInter
  userId: string
}

const userState: UserStateInter = {
  token: '',
  userId: '',
  userInfo: {} as userInfoInter
}
const user = (state = userState, action: { type: userReduce, payload: any }) => {
  switch (action.type) {
    case userReduce.token:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        token: action.payload
      }
      break;
    case userReduce.userInfo:
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return {
        ...state,
        userInfo: action.payload
      }
    case userReduce.userId:
      localStorage.setItem('userId', action.payload);
      return {
        ...state,
        userId: action.payload,
      }
    default:
      return {
        ...state
      }
      break;
  }
}
export default user;