import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.png'
import { fetchToken } from '@/apis/getToken'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const disPatch = useDispatch()
  const navigate = useNavigate()
  // 格式正确提交回调
  const onFinish = async (userData) => {
    await disPatch(fetchToken(userData))
    navigate('/')
    message.success('登录成功')
  }
  return (
    <div className='login'>
      <Card className='login-container'>
        <img className='login-logo' src={logo} alt='' />
        {/* 登录表单 */}
        <Form validateTrigger='onBlur' onFinish={onFinish}>
          <Form.Item
            name='mobile'
            rules={[
              {
                required: true,
                message: '请输入手机号',
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '请输入正确手机号格式',
              },
            ]}
          >
            <Input size='large' placeholder='请输入手机号' />
          </Form.Item>
          <Form.Item
            name='code'
            rules={[
              {
                required: true,
                message: '请输入验证码',
              },
              {
                pattern: /^\d{6}$/,
                message: '请输入正确验证码格式',
              },
            ]}
          >
            <Input size='large' placeholder='请输入验证码' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' size='large' block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
