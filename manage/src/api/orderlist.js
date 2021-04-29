import request from '@/utils/request'

export function index(data = {}) {
  return request({
    url: '/order/index',
    method: 'get',
    params: data
  })
}

export function send(data = {}) {
  return request({
    url: '/order/send',
    method: 'post',
    data
  })
}

export function postWl(data = {}) {
  return request({
    url: '/order/postWL',
    method: 'post',
    data
  })
}
