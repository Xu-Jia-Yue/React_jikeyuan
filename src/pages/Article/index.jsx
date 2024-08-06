import { Link } from 'react-router-dom'
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Table,
  message,
} from 'antd'
// 引入中文包
import locale from 'antd/es/date-picker/locale/zh_CN'
import useChannels from '@/hooks/useChannels'
import { useEffect, useState } from 'react'
import { deleteArticle, fecthArticle } from '@/apis/Article'
import useColumns from './columns'
const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  // 获取频道
  const { channels } = useChannels()

  // 文章列表
  const [articleList, setArticleList] = useState({
    list: [],
    count: 0,
  })

  // 获取文章列表的参数
  const [ariclesParams, setAriclesParams] = useState({
    page: 1,
    per_page: 4,
    begin_pubdate: null,
    end_pubdate: null,
    status: null,
    channel_id: null,
  })

  // 列表刷新更新页面
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

  // 获取 列 数据
  const { columns } = useColumns(delArticle)

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
            // 页码
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
