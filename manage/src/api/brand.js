import request from '@/utils/request'

export function index(data = {}) {
  return request({
    url: '/brand/index',
    method: 'get',
    params: data
  })
}

export function addOrUpdate(data = {}) {
  return request({
    url: '/brand/store',
    method: 'post',
    data
  })
}
export function info(data = {}) {
  return request({
    url: '/brand/info',
    method: 'get',
    params: data
  })
}

export function del(data = {}) {
  return request({
    url: '/brand/destory',
    method: 'post',
    data
  })
}
