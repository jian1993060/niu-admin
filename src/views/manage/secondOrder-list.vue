<template>
    <a-card :bordered="false">
  
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="4" :sm="24">
              <a-form-item label="UID">
                <a-input v-model="queryParam.userId" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item label="交易产品">
                <a-input v-model="queryParam.name" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :md="(!advanced && 8) || 24" :sm="24">
              <span class="table-page-search-submitButtons"
                :style="(advanced && { float: 'right', overflow: 'hidden' }) || {}">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => (this.queryParam = {})">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <s-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData" showPagination="auto" bordered>
      </s-table>
    </a-card>
  </template>
  
  <script>
  import { STable, Ellipsis } from '@/components'
  import { secondOrderList } from '@/api/manage'
  import ExcelModule from './modules/excel.vue'
  import moment from 'moment'
  
  const columns = [
    {
      title: 'uid',
      dataIndex: 'userId'
    },
    {
      title: '买涨/买跌',
      dataIndex: 'orderType',
      customRender: (text) => {
        if (text === 'buy') {
          return '买涨'
        } else if (text === 'sale') {
          return '买跌'
        }
        return '未知'
      }
    },
    {
      title: '金额',
      dataIndex: 'buyAmount'
    },
    {
      title: '买入价格',
      dataIndex: 'price'
    },
    {
      title: '平仓价格',
      dataIndex: 'finalPrice'
    },
    {
      title: '交易产品',
      dataIndex: 'name'
    },
    {
      title: '盈亏',
      dataIndex: 'resAmount'
    }
  
  ]
  
  export default {
    name: 'TableList',
    components: {
      STable,
      Ellipsis,
      ExcelModule
      // CreateForm
    },
    data() {
      this.columns = columns
      return {
        visible: false,
        // 高级搜索 展开/关闭
        advanced: false,
        // 查询参数
        queryParam: {},
        exports: {},
        // 加载数据方法 必须为 Promise 对象
        loadData: (parameter) => {
          const requestParameters = Object.assign({}, parameter, this.queryParam)
          console.log('loadData request parameters:', requestParameters)
          return secondOrderList(requestParameters).then((res) => {
            return res.data
          })
        }
      }
    },
    methods: {
      disabledDate(current) {
        return current && current > moment().endOf('day')
  
      },
      toggleAdvanced() {
        this.advanced = !this.advanced
      }
    }
  }
  </script>
  