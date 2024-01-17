import request from "@/utils/request"

export const getParentAccessList = () => {
  return request({
    url: '/access/parent/list',
    method: 'GET',
  })
}