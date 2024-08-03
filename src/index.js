import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import router from './router'
import { RouterProvider } from 'react-router-dom'
import store from './store'
import { Provider } from 'react-redux'
import 'normalize.css' // 引入初始化Css

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
)
