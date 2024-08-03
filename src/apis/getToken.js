import request from '@/utils/request'
import { setToken } from '@/store/userStore'

// 异步获取token
export const fetchToken = (userData) => {
  return async (dispatch) => {
    const {
      data: { token },
    } = await request.post('/authorizations', userData)
    dispatch(setToken(token))
  }
}
