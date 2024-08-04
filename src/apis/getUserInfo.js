import request from '@/utils/request'
import { setUserInfo } from '@/store/userStore'

// 获取用户信息
export const fetchUserInfo = () => {
  return async (dispatch) => {
    const { data } = await request.get('/user/profile')
    dispatch(setUserInfo(data))
  }
}
