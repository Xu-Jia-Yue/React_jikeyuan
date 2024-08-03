import { createSlice } from '@reduxjs/toolkit'
import { setLocalToken, getLocalToken, clearLocalToken } from '@/utils/token'
const userStore = createSlice({
  name: 'user',
  initialState: {
    token: getLocalToken() || '',
    userInfo: {},
  },
  reducers: {
    // 登录建立token
    setToken(state, action) {
      state.token = action.payload
      setLocalToken(action.payload)
    },

    // 登录后建立用户信息
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },

    // 退出登录清空相关数据
    clearUserInfo(state, action) {
      state.token = ''
      state.userInfo = ''
      clearLocalToken()
    },
  },
})

const { setToken, setUserInfo ,clearUserInfo} = userStore.actions
const userReducer = userStore.reducer

export { setToken, setUserInfo, clearUserInfo }
export default userReducer
