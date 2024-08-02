import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: '*',
    element:<h2>404 NOT FOUND</h2>

  }
])
export default router
