<template>
    <a-card :bordered="false">
  
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="4" :sm="24">
              <a-form-item label="币种代码">
                <a-input v-model="queryParam.id" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item label="币种名称">
                <a-input v-model="queryParam.name" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {}">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
                <a-button type="primary" style="margin-left: 8px" @click="handleAdd">新增</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
  
  
      <s-table ref="table" size="default" rowKey="id" :columns="columns" :data="loadData" showPagination="auto"
        :scroll="{ x: 'max-content' }" bordered>      
        <span slot="logo" slot-scope="text, record">
          <img :src="record.logo" style="width: 64px; height: 64px" />
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">修改排序</a>
          </template>
        </span>
      </s-table>   
      <a-modal
        title="新增股票"
        :width="640"
        :visible="createVisible"
        :confirmLoading="confirmLoading"
        @ok="handleCreateOk"
        @cancel="handleCreateCancel"
        :maskClosable="false"
        :destroyOnClose="true"
      >
        <a-form :form="form" layout="vertical">
          <a-form-item
            label="名称"
          >
            <a-input
              v-decorator="[
                'name',
                {
                  rules: [{ required: true, message: '请输入名称' }]
                }
              ]"
              placeholder="请输入名称"
            />
          </a-form-item>

          <a-form-item
            label="图标"
          >
            <a-upload
              name="file"
              :action="uploadUrl"
              :headers="headers"
              :showUploadList="false"
              @change="handleChange"
              class="avatar-uploader"
            >
              <div v-if="!imageUrl" class="upload-placeholder">
                <a-icon type="plus" />
                <div class="ant-upload-text">点击上传图标</div>
              </div>
              <div v-else class="image-preview">
                <img :src="imageUrl" alt="logo" />
                <div class="image-preview-mask">
                  <a-icon type="plus" />
                </div>
              </div>
            </a-upload>
          </a-form-item>
        </a-form>
      </a-modal>
    </a-card>
  </template>
  
  <script>
  import { STable, Ellipsis } from '@/components'
  import { stockList, createStock } from '@/api/manage'
  import moment from 'moment'
  import CreateMemberForm from './modules/CreateMemberForm'
  
  const columns = [
  {
      title: '币种代码',
      dataIndex: 'id'
    }, 
    {
      title: '币种名称',
      dataIndex: 'name'
    }, 
    {
      title: '图标',
      dataIndex: 'logo',
      scopedSlots: { customRender: 'logo' }
    }, 
    {
      title: '币种类型',
      dataIndex: 'type',
      customRender: (text) => (text === 'crypt' ? '虚拟币' : '贵金属')
    }
  
  ]
  
  export default {
    name: 'TableList',
    components: {
      STable,
      Ellipsis,
      CreateMemberForm
    },
    data() {
      this.columns = columns
      return {
        createVisible: false,
        confirmLoading: false,
        imageUrl: '',
        uploadUrl: "http://127.0.0.1:10023/api/file/upload",  
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('Admin-Token')
        },
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 13 }
        },
        form: this.$form.createForm(this),
        editLevel: false,
        // 高级搜索 展开/关闭
        advanced: false,
        // 查询参数
        queryParam: {},
        upUserModel: {
          tjsy: '1',
          fhsy: '1',
          id: ''
        },
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          const requestParameters = Object.assign({
            pageSize: 10,
            pageNo: 1
          }, parameter, this.queryParam)
          console.log('loadData request parameters:', requestParameters)
          return stockList(requestParameters)
            .then(res => {
              return res.data
            })
        }
      }
    },
    methods: {    
      handleAdd() {
        this.createVisible = true
      },
      handleChange(info) {
        if (info.file.status === 'done') {
          console.log(info.file)
          this.imageUrl = info.file.response.data
        }
      },
      handleCreateOk() {
        this.form.validateFields((err, values) => {
          if (!err) {
            if (!this.imageUrl) {
              this.$message.error('请上传图标')
              return
            }
            this.confirmLoading = true
            const formData = {
              ...values,
              logo: this.imageUrl
            }
            createStock(formData).then(res => {
              if (res.code === 0) {
                this.$message.success('新增成功')
                this.createVisible = false
                this.$refs.table.refresh()
              } else {
                this.$message.error(res.message || '新增失败')
              }
            }).catch(err => {
              this.$message.error('新增失败：' + err.message)
            }).finally(() => {
              this.confirmLoading = false
            })
          }
        })
      },
      handleCreateCancel() {
        this.form.resetFields()
        this.imageUrl = ''
        this.createVisible = false
      },
      disabledDate(current) {
        if (this.queryParam.startDate) {
          return current < moment(this.queryParam.startDate)
        }
      }  
       
    }
  }
  </script>
  
  <style lang="less" scoped>
  .avatar-uploader {
    .upload-placeholder {
      width: 128px;
      height: 128px;
      border: 1px dashed #d9d9d9;
      border-radius: 4px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: border-color 0.3s;

      &:hover {
        border-color: #1890ff;
      }

      .ant-upload-text {
        margin-top: 8px;
        color: #666;
      }
    }

    .image-preview {
      width: 128px;
      height: 128px;
      position: relative;
      border-radius: 4px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .image-preview-mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.3s;
        cursor: pointer;

        .anticon {
          color: #fff;
          font-size: 24px;
        }
      }

      &:hover {
        .image-preview-mask {
          opacity: 1;
        }
      }
    }
  }
  </style>
  