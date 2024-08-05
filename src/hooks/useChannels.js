import { useState, useEffect } from 'react'
import { fetchChannels } from '@/apis/getChannels'

const useChannels = () => {
  const [channels, setChannels] = useState([])
  // 获取频道
  useEffect(() => {
    const getChannels = async () => {
      const { data } = await fetchChannels()
      setChannels(data.channels)
    }
    getChannels()
  }, [])
  return {
    channels
  }
}

export default useChannels
