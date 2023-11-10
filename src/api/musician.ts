import request from "../utils/request";

export function getMusicianListApi() {
  return request({
    url: '/musician/list',
    method: 'GET',
  })
}
// 添加
interface MusicianInter {
  [key: string] : string | number
}
export function addMusicianApi(data: MusicianInter) {
  return request({
    url: '/musician/add',
    method: 'POST',
    data: data
  })
}
// 详情
export function detailMusicianApi(id: number) {
  return request({
    url: '/musician/detail/'+id,
    method: 'GET',
  })
}
// 编辑
export function editMusicianApi(data: MusicianInter) {
  return request({
    url: '/musician/edit',
    method: 'POST',
    data: data
  })
}

// 删除
export function delMusicianApi(id: number) {
  return request({
    url: '/musician/del/'+id,
    method: 'DELETE',
  })
}