import { web3Reduce } from "../../utils/enums";
interface web3Inter {
  wallet: any
}
const web3State: web3Inter = {
  wallet: {}
}
const app = (state = web3State, action: { type: web3Reduce, payload: any }) => {
  switch (action.type) {
    case web3Reduce.wallet:
      return {
        ...state,
        wallet: action.payload
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