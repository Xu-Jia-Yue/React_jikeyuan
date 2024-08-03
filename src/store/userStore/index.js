import { createSlice } from '@reduxjs/toolkit'
import request from '@/utils/request'
import { setLocalToken, getLocalToken } from '@/utils/token'
const userStore = createSlice({
  name: 'user',
  initialState: {
    token: getLocalToken() || '',
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      // 本地存入token
      setLocalToken(action.payload)
    },
  },
})

const { setToken } = userStore.actions
// 异步获取token
const fetctToken = (userData) => {
  return async (dispatch) => {
    const {
      data: { token },
    } = await request.post('/authorizations', userData)
    // console.log(data)
    dispatch(setToken(token))
  }
}
const userReducer = userStore.reducer
export { fetctToken }
export default userReducer
