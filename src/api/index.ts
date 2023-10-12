import request from "../utils/request";
export function uploadApi() {
  return request({
    url: '/upload',
    method: 'POST',
  })
}