import request from "../utils/request";

export function getActivityListApi() {
  return request({
    url: '/activity/list',
    method: 'GET',
  })
}
// 添加
interface activityInter {
  [key: string] : string | number
}
export function addBannerApi(data: activityInter) {
  return request({
    url: '/banner/add',
    method: 'POST',
    data: data
  })
}
// 详情
export function detailActivityApi(id: number) {
  return request({
    url: '/activity/detail/'+id,
    method: 'GET',
  })
}
// 编辑
export function editActivityApi(data: activityInter) {
  return request({
    url: '/activity/edit',
    method: 'POST',
    data: data
  })
}

// 删除
export function delActivityApi(id: number) {
  return request({
    url: '/activity/del/'+id,
    method: 'DELETE',
  })
}