import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetctToken } from '@/store/userStore'

export default function Layout() {
  const { token } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  return (
    <div>
      {token} <button onClick={() => dispatch(fetctToken({mobile:'13800000002',code:'246810'}))}>更改</button>
    </div>
  )
}
