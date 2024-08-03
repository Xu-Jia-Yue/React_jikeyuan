import { getLocalToken } from '@/utils/token'
import { message } from 'antd'
import { Navigate } from 'react-router-dom'

const AuthRoute = ({ children }) => {
  const isToken = getLocalToken()
  if (isToken) {
    return <>{children}</>
  } else {
    message.error('请登录后进行操作')
    return <Navigate to='/login' replace />
  }
}

export default AuthRoute
