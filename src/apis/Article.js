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

// 获取文章详情
export const getArticleDateil = (id) => {
  return request.get(`mp/articles/${id}`)
}

// 更新文章
export const edidArticle = (id, data) => {
  return request.put(`/mp/articles/${id}?draft=false`, data)
}
