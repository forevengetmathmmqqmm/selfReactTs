import request from "../utils/request";
export function uploadApi() {
  return request({
    url: '/comment/upload',
    method: 'POST',
  })
}