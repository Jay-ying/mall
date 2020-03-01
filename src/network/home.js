import {request} from './request'

export function getHomeMostData() {
  return request({
    url: '/home/multidata'
    // url: '/recommend'
  })
}