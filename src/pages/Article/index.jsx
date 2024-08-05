import { Link, useNavigate } from 'react-router-dom'
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Table,
  Space,
  Tag,
  Popconfirm,
  message,
} from 'antd'
// 引入中文包
import locale from 'antd/es/date-picker/locale/zh_CN'
import useChannels from '@/hooks/useChannels'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import img404 from '@/assets/error.png'
import { deleteArticle, fecthArticle } from '@/apis/getArticle'
const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const naviagate = useNavigate()
  // 获取频道
  const { channels } = useChannels()

  // 文章列表
  const [articleList, setArticleList] = useState({
    list: [],
    count: 0,
  })

  const [ariclesParams, setAriclesParams] = useState({
    page: 1,
    per_page: 4,
    begin_pubdate: null,
    end_pubdate: null,
    status: null,
    channel_id: null,
  })

  // 列表刷新
  const getList = async (params) => {
    const { data } = await fecthArticle(params)
    setArticleList({ list: data.results, count: data.total_count })
  }

  // 初始化文章列表
  useEffect(() => {
    getList(ariclesParams)
  }, [ariclesParams])

  // 筛选文章
  const onFinish = (formV) => {
    setAriclesParams({
      ...formV,
      status: formV.status,
      begin_pubdate: formV.date?.[0].format('YYYY-MM-DD') || null,
      end_pubdate: formV.date?.[1].format('YYYY-MM-DD') || null,
    })
  }

  // 切换页码
  const pageChange = (v) => {
    setAriclesParams({
      ...ariclesParams,
      page: v,
    })
  }

  // 删除文章
  const delArticle = async (data) => {
    await deleteArticle(data.id)
    getList(ariclesParams)
    message.success('删除成功')
  }

  // 准备列数据
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
            <Button type='primary' shape='circle' icon={<EditOutlined />} onClick={() => naviagate(`/publish?id=${data.id}`)} />
            <Popconfirm
              title='确认删除该条文章吗?'
              onConfirm={() => delArticle(data)}
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

  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={'/'}>首页</Link> },
              { title: '文章列表' },
            ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }} onFinish={onFinish}>
          <Form.Item label='状态' name='status'>
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label='频道' name='channel_id'>
            <Select placeholder='请选择文章频道' style={{ width: 120 }}>
              {channels.map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item label='日期' name='date'>
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 筛选文章列表 */}
      <div>
        {/*    数据渲染    */}
        <Card title={`根据筛选条件共查询到 ${articleList.count} 条结果：`}>
          <Table
            rowKey='id'
            columns={columns}
            dataSource={articleList.list}
            pagination={{
              current: ariclesParams.page,
              pageSize: ariclesParams.per_page,
              onChange: pageChange,
              total: articleList.count,
            }}
          />
        </Card>
      </div>
    </div>
  )
}

export default Article
