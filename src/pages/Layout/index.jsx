import { Layout, Menu, message, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchUserInfo } from '@/apis/getUserInfo'
import { useDispatch, useSelector } from 'react-redux'
import { clearUserInfo } from '@/store/userStore'

const { Header, Sider } = Layout

const items = [
  {
    label: '首页',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: '文章管理',
    key: '/article',
    icon: <DiffOutlined />,
  },
  {
    label: '创建文章',
    key: '/publish',
    icon: <EditOutlined />,
  },
]

const GeekLayout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { pathname } = useLocation() // 路由反向高亮
  const { userInfo } = useSelector((state) => state.user)

  // 获取用户数据
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])

  // 切换二级路由
  const selectMenu = ({ key }) => {
    navigate(key)
  }

  // 退出登录
  const quitLogin = () => {
    dispatch(clearUserInfo())
    message.success('退出登录成功')
    navigate('/login')
  }

  return (
    <Layout>
      {/* 头部 */}
      <Header className='header'>
        <div className='logo' />
        <div className='user-info'>
          <span className='user-name'>{userInfo.name}</span>
          <span className='user-logout'>
            <Popconfirm
              title='是否确认退出？'
              okText='退出'
              cancelText='取消'
              onConfirm={quitLogin}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      {/* 导航栏 */}
      <Layout>
        <Sider width={200} className='site-layout-background'>
          <Menu
            mode='inline'
            theme='dark'
            selectedKeys={pathname}
            items={items}
            onSelect={selectMenu}
            style={{ height: '100%', borderRight: 0 }}
          ></Menu>
        </Sider>
        {/* 二级路由出口 */}
        <Layout className='layout-content' style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout
