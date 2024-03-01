import { appReduce } from "../../utils/enums";

const appState = {
  selectedKeys: []
}
const app = (state = appState, action: { type: appReduce, payload: any }) => {
  switch (action.type) {
    case appReduce.selectedKeys:
      return {
        ...state,
        selectedKeys: action.payload
      }
      break;
    default:
      return {
        ...state
      }
      break;
  }
}
export default app;