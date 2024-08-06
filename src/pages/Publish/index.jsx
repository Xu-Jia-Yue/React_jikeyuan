import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { fetchPublish } from '@/apis/postPublish'
import useChannels from '@/hooks/useChannels'
import { edidArticle, getArticleDateil } from '@/apis/Article'

const { Option } = Select

const Publish = () => {
  // 上传图片
  const [imageList, setImageList] = useState([])
  const onUploadChange = (info) => {
    setImageList(info.fileList)
  }

  // 数据回填
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  const [form] = Form.useForm()
  useEffect(() => {
    const getDatetail = async () => {
      if (articleId) {
        const { data } = await getArticleDateil(articleId)
        const { cover, ...formValue } = data
        // 设置表单数据
        form.setFieldsValue({ ...formValue, type: cover.type })
        setImgType(cover.type)
        setImageList(cover.images.map((url) => ({ url })))
      }
    }
    getDatetail()
  }, [form, articleId])

  // 获取频道
  const { channels } = useChannels()

  // 上传封面
  const [imgType, setImgType] = useState(0)
  const onTypeChange = (v) => {
    setImageList([])
    setImgType(v.target.value)
  }

  // 提交/更新 表单内容
  const onFinish = async (formValue) => {
    if (imgType !== imageList.length)
      return message.warning('图片类型和数量不一致')
    formValue.cover = {
      type: imgType, // 封面模式
      images: imageList.map((item) =>
        item.response ? item.response.data.url : item.url
      ), // 图片列表
    }
    console.log({ id: articleId, ...formValue })

    if (articleId) {
      await edidArticle(articleId, { ...formValue })
    } else {
      await fetchPublish(formValue)
    }
    message.success(articleId ? '更新文章成功' : '发布文章成功')
  }

  return (
    <div className='publish'>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={'/'}>首页</Link> },
              { title: articleId ? '编辑文章' : '发布文章' },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}
        >
          {/* 标题 */}
          <Form.Item
            label='标题'
            name='title'
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder='请输入文章标题' style={{ width: 400 }} />
          </Form.Item>

          {/* 频道 */}
          <Form.Item
            label='频道'
            name='channel_id'
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder='请选择文章频道' style={{ width: 400 }}>
              {channels.map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>

          {/* 封面 */}
          <Form.Item label='封面'>
            <Form.Item name='type'>
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imgType > 0 && (
              <Upload
                name='image'
                listType='picture-card'
                showUploadList
                action={'http://geek.itheima.net/v1_0/upload'}
                onChange={onUploadChange}
                fileList={imageList}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>

          {/* 内容 */}
          <Form.Item
            label='内容'
            name='content'
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            {/* 富文本编辑器 */}
            <ReactQuill
              className='publish-quill'
              theme='snow'
              placeholder='请输入文章内容'
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size='large' type='primary' htmlType='submit'>
                {articleId ? '编辑文章' : '发布文章'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
