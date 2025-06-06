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
  import { financeList } from '@/api/manage'
  
  const columns = [
  {
    title: '用户UID',
    dataIndex: 'userId'
  },
  {
    title: '币种',
    dataIndex: 'name'
  },
  {
    title: '变动前金额',
    dataIndex: 'beforeAmount'
  },
  {
    title: '变动后金额',
    dataIndex: 'afterAmount'
  },
  {
    title: '类型',
    dataIndex: 'type',
    customRender: (text) => {
      const typeMap = {
        'trade': '交易',
        'canceTrade': '取消交易',
        'transfer': '转账',
        'mining': '挖矿',
        'miningWithdrawal': '挖矿提现',
        'recharge': '充值',
        'withdrawal': '提现',
        'test': '测试',
        'gift': '赠送'
      }
      return typeMap[text] || '未知'
    }
  },
  {
    title: '钱包类型',
    dataIndex: 'walletType',
    customRender: (text) => {
      if (text === 'trade') {
        return '交易账户'
      } else if (text === 'cloud') {
        return '挖矿账户'
      }
      return text || '未知'
    }
  },
  {
    title: '交易结果',
    dataIndex: 'transResult'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  }
]
  
  export default {
    name: 'TableList',
    components: {
      STable,
      Ellipsis
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
          return financeList(requestParameters).then((res) => {
            return res.data
          })
        }
      }
    },
    methods: {
    }
  }
  </script>
  