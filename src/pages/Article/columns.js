import { Space, Button, Popconfirm, Tag } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useNavigate } from 'react-router-dom'

// 准备列数据
const useColumns = (delFn) => {
  const navigate = useNavigate()
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: (cover) => {
        return (
          <img src={cover.images[0] || img404} width={80} height={60} alt='' />
        )
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (data) =>
        data === 2 ? (
          <Tag color='success'>审核通过</Tag>
        ) : (
          <Tag color='warning'>待审核</Tag>
        ),
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
    },
    {
      title: '操作',
      render: (data) => {
        return (
          <Space size='middle'>
            <Button
              type='primary'
              shape='circle'
              icon={<EditOutlined />}
              onClick={() => navigate(`/publish?id=${data.id}`)}
            />
            <Popconfirm
              title='确认删除该条文章吗?'
              onConfirm={() => delFn(data)}
              okText='确认'
              cancelText='取消'
            >
              <Button
                type='primary'
                danger
                shape='circle'
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      },
    },
  ]
  return {
    columns
  }
}

export default useColumns
