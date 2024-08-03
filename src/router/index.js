import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import AuthRoute from '@/components/AuthRoute'
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: '*',
    element: <h2>404 NOT FOUND</h2>,
  },
])
export default router
