<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="4" :sm="24">
            <a-form-item label="会员UID">
              <a-input v-model="queryParam.id" allow-clear />
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <a-form-item label="邮箱">
              <a-input v-model="queryParam.email" allow-clear />
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <a-form-item label="实名状态">
              <a-select v-model="queryParam.status" default-value="0" placeholder="请选择">
                <a-select-option value="1">已实名</a-select-option>
                <a-select-option value="2">未实名</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <a-form-item label="盈利/亏损">
              <a-select v-model="queryParam.type" default-value="0" placeholder="请选择">
                <a-select-option value="win">盈利</a-select-option>
                <a-select-option value="loss">亏损</a-select-option>
                <a-select-option value="normal">正常</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="(!advanced && 8) || 24" :sm="24">
            <span
              :style="(advanced && { float: 'right', overflow: 'hidden' }) || {}"
              class="table-page-search-submitButtons"
            >
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => (this.queryParam = {})">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <s-table
      ref="table"
      :columns="columns"
      :data="loadData"
      :scroll="{ x: 'max-content' }"
      bordered
      rowKey="id"
      showPagination="auto"
      size="default"
    >
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="detailUser(record)">详情</a>
          <a-divider type="vertical" />
          <a @click="modifyType(record)">修改状态</a>
        </template>
      </span>
    </s-table>
    <a-modal
      :confirmLoading="confirmLoading"
      :visible="typeVisible"
      title="盈亏状态"
      @cancel="typeUpCance"
      @ok="typeUpOk"
    >
      <a-form-model :label-col="{ span: 4 }" :model="userType" :wrapper-col="{ span: 14 }">
        <a-form-model-item :rules="{ required: true }" label="盈亏状态" prop="type">
          <a-radio-group v-model="userType.type">
            <a-radio value="win"> 盈利</a-radio>
            <a-radio value="loss"> 亏损</a-radio>
            <a-radio value="normal"> 正常</a-radio>
          </a-radio-group>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <a-drawer
      :closable="false"
      :visible="detailVisible"
      class="detail-drawer"
      placement="right"
      title="详情"
      width="65%"
      @close="() => (detailVisible = false)"
    >
      <a-tabs v-model="tabsActive" @change="tabsChange">
        <a-tab-pane v-for="item in tabsList" :key="item.key" :tab="item.tab"></a-tab-pane>
      </a-tabs>
      <a-table
        :columns="detailColumn[tabsActive]"
        :data-source="detailParams[tabsActive]"
        :pagination="false"
        :scroll="{ x: false, y: 'calc(100vh - 440px)' }"
        bordered
        rowKey="id"
        style="word-break: break-all"
      ></a-table>
    </a-drawer>
  </a-card>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { memberList, upMemberType, userDetail } from '@/api/manage'
import moment from 'moment'
import CreateMemberForm from './modules/CreateMemberForm'

const columns = [
  {
    title: 'UID',
    dataIndex: 'id'
  },
  {
    title: '邮箱',
    dataIndex: 'email'
  },
  {
    title: '实名状态',
    dataIndex: 'realStatus',
    customRender: (text) => (text === '1' ? text : '未实名')
  },
  {
    title: 'eth地址',
    dataIndex: 'evmAddress'
  },
  {
    title: 'trx地址',
    dataIndex: 'trxAddress'
  },
  {
    title: 'btc地址',
    dataIndex: 'btcAddress'
  },
  {
    title: '盈利/亏损',
    dataIndex: 'type',
    customRender: (text) => {
      if (text === 'win') {
        return '盈利'
      } else if (text === 'loss') {
        return '亏损'
      } else if (text === 'normal') {
        return '正常'
      }
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const wallets = [
{
    title: '币种',
    dataIndex: 'name'
  },
  {
    title: '数量',
    dataIndex: 'amount'
  },
  {
    title: '类型',
    dataIndex: 'type',
    customRender: (text) => {
      if (text === 'trade') {
        return '交易账户'
      } else if (text === 'cloud') {
        return '理财账户'
      }
      return '未知'
    }
  }
]
const tradeOrders = [
  {
    title: '金额',
    dataIndex: 'amount'
  },
  {
    title: '数量',
    dataIndex: 'num'
  },
  {
    title: '买入/卖出',
    dataIndex: 'type',
    customRender: (text) => {
      if (text === 'buy') {
        return '买入'
      } else if (text === 'sale') {
        return '卖出'
      }
      return '未知'
    }
  },
  {
    title: '日期',
    dataIndex: 'createTime'
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
  }
]
const secondOrders = [
  {
    title: '买涨/买跌',
    dataIndex: 'orderType',
    customRender: (text) => {
      if (text === '2') {
        return 'lock'
      } else if (text === '1') {
        return 'unLock'
      }
      return 'finish'
    }
  },
  {
    title: '盈亏',
    dataIndex: 'resAmount'
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
  }
 
]

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    CreateMemberForm
  },
  data () {
    this.columns = columns
    return {
      detailColumn: {
        wallets,
        tradeOrders,
        secondOrders
      },
      editLevel: false,
      formState: {
        level: '0',
        id: ''
      },
      confirmLoading: false,
      typeVisible: false,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      userType: {
        type: ''
      },
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return memberList(requestParameters).then((res) => {
          return res.data
        })
      },
      detailVisible: false,
      //   钱包余额，现货交易，秒合约交易
      tabsList: [
        { tab: '钱包余额', key: 'wallets' },
        { tab: '现货交易', key: 'tradeOrders' },
        {
          tab: '秒合约交易',
          key: 'secondOrders'
        }
      ],
      tabsActive: 'wallets',
      detailParams: {}
    }
  },
  methods: {
    tabsChange (v) {
      console.log(v, 'tabsChange')
    },
    disabledDate (current) {
      if (this.queryParam.startDate) {
        return current < moment(this.queryParam.startDate)
      }
    },
    modifyType (record) {
      this.userType.id = record.id
      this.userType.type = record.type
      console.log(this.userType)
      this.typeVisible = true
    },
    typeUpOk () {
      upMemberType(this.userType)
        .then(() => {
          this.typeVisible = false
          this.$refs.table.refresh(true)
          this.upUserModel = {}
        })
        .catch(() => {
          this.visible = false
          this.upUserModel = {}
        })
    },
    typeUpCance () {
      this.typeVisible = false
      this.userType = {}
    },
    detailUser (record) {
      userDetail(record.id).then((res) => {
        this.detailVisible = true
        this.detailParams = res.data
        // this.$message.success('查询成功')
        // this.$refs.table.refresh(true)
      })
    }
  }
}
</script>
<style lang="less">
.detail-drawer {
  //.ant-table td { white-space: nowrap; }
  :deep(.ant-table-fixed-header .ant-table-scroll .ant-table-header) {
    overflow: hidden;
  }
}
</style>
