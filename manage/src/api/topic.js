import request from '@/utils/request'

export function index(data = {}) {
  return request({
    url: '/topic/index',
    method: 'get',
    params: data
  })
}

export function addOrUpdate(data = {}) {
  return request({
    url: '/topic/store',
    method: 'post',
    data
  })
}
export function info(data = {}) {
  return request({
    url: '/topic/info',
    method: 'get',
    params: data
  })
}

export function del(data = {}) {
  return request({
    url: '/topic/destory',
    method: 'post',
    data
  })
}
