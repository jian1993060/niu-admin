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
          <a-col :md="4" :sm="24">
            <a-form-item label="订单状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="1">已完成</a-select-option>
                <a-select-option value="2">挂单中</a-select-option>
                <a-select-option value="3">已经撤单</a-select-option>
              </a-select>
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
      <span slot="action" slot-scope="text, record">
        <template>
          <a v-if="record.status == '2'" @click="finishTrade(record)">成交</a>
        </template>
      </span>
    </s-table>
  </a-card>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { orderList, finishOrder } from '@/api/manage'
import ExcelModule from './modules/excel.vue'
import moment from 'moment'

const columns = [
  {
    title: 'uid',
    dataIndex: 'userId'
  },
  {
    title: '买入/卖出',
    dataIndex: 'type',
    customRender: (text) => {
      if (text === 'buy') {
        return '买入'
      } else if (text === 'sell') {
        return '卖出'
      }
      return '未知'
    }
  },
  {
    title: '数量',
    dataIndex: 'num'
  },
  {
    title: '金额',
    dataIndex: 'amount'
  },
  {
    title: '交易产品',
    dataIndex: 'name'
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: (text) => {
      if (text === '1') {
        return '已成交'
      } else if (text === '2') {
        return '挂单'
      } else if (text === '3') {
        return '已经撤单'
      }
      return '未知'
    }

  },
  {
    title: '日期',
    dataIndex: 'createTime'
  },
  {
    title: '操作',
    dataIndex: 'action',
    //width: '200px',
    scopedSlots: { customRender: 'action' }
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
        return orderList(requestParameters).then((res) => {
          return res.data
        })
      }
    }
  },
  methods: {

    finishTrade(record) {
      this.$confirm({
        title: '提示',
        content: '是否确认成交？',
        onOk: () => {
          finishOrder(record.id).then(res => {
            this.$message.success('成交成功')
            this.$refs.table.refresh(true)
          })
        },
        onCancel: () => {
          this.$message.error('取消成交')
        }
      })
    },
    disabledDate(current) {
      return current && current > moment().endOf('day')

    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    }
  }
}
</script>
