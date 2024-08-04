import request from '@/utils/request'

// 提交文章
export const fetchPublish = (data) => {
  return request.post('/mp/articles?draft=false', data)
}
