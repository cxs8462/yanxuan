import request from '@/utils/request'

export function upPic(data = {}) {
  return request({
    url: '/upload/brandPic',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}
