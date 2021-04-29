import request from '@/utils/request'

export function login(data = {}) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function state(data = {}) {
  return request({
    url: '/auth/info',
    method: 'post',
    data
  })
}

export function user(data = {}) {
  return request({
    url: '/user/index',
    method: 'get',
    data
  })
}
