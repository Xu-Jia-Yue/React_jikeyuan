import request from '@/utils/request'

// 获取频道
export const fetchChannels = async () => {
  return request.get('/channels')
}
