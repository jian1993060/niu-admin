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
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
  
  
      <s-table ref="table" size="default" rowKey="id" :columns="columns" :data="loadData" showPagination="auto"
        :scroll="{ x: 'max-content' }" bordered>      
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">修改排序</a>
          </template>
        </span>
      </s-table>   
    </a-card>
  </template>
  
  <script>
  import { STable, Ellipsis } from '@/components'
  import { stockList} from '@/api/manage'
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
      title: '币种类型',
      dataIndex: 'type',
      customRender: (text) => (text === 'crypt' ? '虚拟币' : '贵金属')
    },
    {
      title: '排序',
      dataIndex: 'orderNum'
    }
    // ,
    // {
    //   title: '操作',
    //   dataIndex: 'action',
    //   scopedSlots: { customRender: 'action' }
    // }
  
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
        upVisible: false,
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
          const requestParameters = Object.assign({}, parameter, this.queryParam)
          console.log('loadData request parameters:', requestParameters)
          return stockList(requestParameters)
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
      }  
       
    }
  }
  </script>
  