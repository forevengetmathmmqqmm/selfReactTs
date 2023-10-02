import { userReduce } from "../utiles/enums";

const userState = {
  token: ''
}
const user = (state = userState, action: {type: userReduce, payload: any }) => {
  switch (action.type) {
    case 'Token':
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