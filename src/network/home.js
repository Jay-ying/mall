import {request} from './request'

export function getHomeMostData() {
  return request({
    url: '/home/multidata'
    // url: '/recommend'
  })
}

export function getHomeGoodsData(type, page) {
  return request({
    url: '/home/data',
    params: {
      type: type,
      page: page
    }
  })
}