import request from '@/utils/request'
import { setUserInfo } from '@/store/userStore'

export const fetchUserInfo = () => {
  return async (dispatch) => {
    const { data } = await request.get('/user/profile')
    dispatch(setUserInfo(data))
  }
}
