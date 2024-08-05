import request from '@/utils/request'

// 获取文章
export const fecthArticle = (params) => {
  return request.get('/mp/articles', {
    params,
  })
}

// 删除文章
export const deleteArticle = (id) => {
  return request.delete(`mp/articles/${id}`)
}
