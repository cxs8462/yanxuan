import request from '@/utils/request'

export function goodsList(data = { page: 1, size: 10 }) {
  return request({
    url: '/goods/index',
    method: 'get',
    params: data
  })
}
export function addOrUpdate(data = {}) {
  return request({
    url: '/goods/store',
    method: 'post',
    data
  })
}
export function info(data = {}) {
  return request({
    url: '/goods/info',
    method: 'get',
    params: data
  })
}
export function del(data = {}) {
  return request({
    url: '/goods/destory',
    method: 'post',
    data
  })
}
