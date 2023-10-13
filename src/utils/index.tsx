import { message } from "antd"
import Cookies from "cookies-ts"
const cookies = new Cookies()

export const my_cookies = {
  getItem(key: string){
    return cookies.get(key)
  },
  setItem(key: string, val: any, expires?: any){
    cookies.set(key, val, expires)
  },
  getItems(){
    return cookies.keys()
  },
  isKey(key: string){
    return cookies.isKey(key)
  },
}
export const msgLoading = (content: string) => {
  const [messageApi] = message.useMessage();
  messageApi.open({
    type: 'loading',
    content,
  });
}

export const destroyLoading = () => {
  const [messageApi] = message.useMessage();
  messageApi.destroy
}