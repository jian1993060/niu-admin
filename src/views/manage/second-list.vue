<template>
    <a-card :bordered="false">    
      <a-button type="primary" @click="handleAdd()">新建</a-button>
      <s-table ref="table" size="default" rowKey="id" :columns="columns" :data="loadData" showPagination="auto"
        :scroll="{ x: 'max-content' }" bordered>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">编辑</a>
          </template>       
          <a-divider type="vertical" />
          <template>
            <a @click="handleDel(record)">删除</a>
          </template>
        </span>    
      </s-table>
      
      <a-modal title="秒合约产品" :visible="visible" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel">
        <a-form-model :model="upUserModel">
          <a-form-model-item label="时间（秒）">
            <a-input type=number v-model="upUserModel.times" allow-clear />
          </a-form-model-item>
          <a-form-model-item label="盈利百分比">
            <a-input type=number v-model="upUserModel.rate" allow-clear />
          </a-form-model-item>
          <a-form-model-item label="最小金额">
            <a-input type=number v-model="upUserModel.minAmount" allow-clear />
          </a-form-model-item>
          <a-form-model-item label="手续费">
            <a-input type=number  v-model="upUserModel.tradeRate" allow-clear />
          </a-form-model-item>
          <a-form-model-item label="排序">
            <a-input type=number v-model="upUserModel.orderNum" allow-clear />
          </a-form-model-item>
        </a-form-model>
      </a-modal>
      <create-member-form ref="createModal" @ok="$refs.table.refresh(true)" />
    </a-card>
  </template>
  
  <script>
  // import moment from 'moment'
  import { STable, Ellipsis } from '@/components'
  import { secondList,secondEdit,secondDel} from '@/api/manage'
  import moment from 'moment'
  import CreateMemberForm from './modules/CreateMemberForm'
  import { refresh } from 'less'
  
  const columns = [
  {
      title: '时间',
      dataIndex: 'times',
    }, 
    {
      title: '盈利百分比',
      dataIndex: 'rate'
    }, 
    {
      title: '最小金额',
      dataIndex: 'minAmount'
    }, 
    {
      title: '最大金额',
      dataIndex: 'maxAmount'
    }, 
    {
      title: '手续费',
      dataIndex: 'tradeRate'
    }, 
    {
      title: '排序',
      dataIndex: 'orderNum'
    },
  {
      title: '操作',
      dataIndex: 'action',
      scopedSlots: { customRender: 'action' }
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
        editLevel: false,
        formState: {
          level: "0",
          id:''
        },
        confirmLoading: false,
        visible: false,
        // 高级搜索 展开/关闭
        advanced: false,
        // 查询参数
        queryParam: {},
        upUserModel: {
        },
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          const requestParameters = Object.assign({}, parameter, this.queryParam)
          console.log('loadData request parameters:', requestParameters)
          return secondList(requestParameters)
            .then(res => {
              return res.data
            })
        }
      }
    },
    methods: {    
      disabledDate(current) {
        if (this.queryParam.startDate) {
          return current < moment(this.queryParam.startDate)
        }
      },
      handleOk(){
        secondEdit(this.upUserModel).then(() => {
          this.visible = false
          this.$refs.table.refresh(true)
          this.upUserModel = {}
        })
        .catch(() => {
          this.visible = false
          this.upUserModel = {}
        })
      },
      handleCancel(){
        this.visible = false
        this.upUserModel = {}
      },
      handleAdd(){
        this.upUserModel = {}
        this.visible = true
      },
      handleEdit(record){
        this.upUserModel = record
        this.visible = true
      },
      handleDel(record){
        this.$confirm({
          title: '提示',
          content: '确定删除吗？',
          onOk: () => {
            secondDel(record.id).then(() => {
              this.$message.success('删除成功')
              this.$refs.table.refresh(true)
            })
          },
          onCancel() {
            console.log('Cancel')
          }
        })
      },
       
    }
  }
  </script>
  