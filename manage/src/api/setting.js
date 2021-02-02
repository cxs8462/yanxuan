import request from '@/utils/request'

export function index(data = {}) {
  return request({
    url: '/ad/index',
    method: 'get',
    params: data
  })
}

export function addOrUpdateBanner(data = {}) {
  return request({
    url: '/ad/updatebanner',
    method: 'post',
    data
  })
}
export function addOrUpdateAdmin(data = {}) {
  return request({
    url: '/ad/updateadmin',
    method: 'post',
    data
  })
}

export function del(data = {}) {
  return request({
    url: '/ad/del',
    method: 'post',
    data
  })
}
