import { userReduce } from "../utiles/enums";

const userState = {
  token: ''
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
  
    default:
      return {
        ...state
      }
      break;
  }
}
export default user;