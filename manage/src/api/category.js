import request from '@/utils/request'

export function index(data = {}) {
  return request({
    url: '/category/index',
    method: 'get',
    params: data
  })
}

export function addOrUpdate(data = {}) {
  return request({
    url: '/category/store',
    method: 'post',
    data
  })
}
export function info(data = {}) {
  return request({
    url: '/category/info',
    method: 'get',
    params: data
  })
}

export function del(data = {}) {
  return request({
    url: '/category/destory',
    method: 'post',
    data
  })
}
