import request from '@/utils/request'

// 获取频道
export const fetchChannels = async () => {
  const { data } = await request.get('/channels')
  return data.channels
}
