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
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="1">已实名</a-select-option>
                <a-select-option value="2">未实名</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <a-form-item label="盈利/亏损">
              <a-select v-model="queryParam.type" placeholder="请选择" default-value="0">
                <a-select-option value="win">盈利</a-select-option>
                <a-select-option value="loss">亏损</a-select-option>
                <a-select-option value="normal">正常</a-select-option>
              </a-select>
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
          <a @click="detailUser(record)">详情</a>
          <a-divider type="vertical" />
          <a @click="modifyType(record)">修改状态</a>
        </template>
      </span>
    </s-table>
    <a-modal title="盈亏状态" :visible="typeVisible" @ok="typeUpOk" @cancel="typeUpCance"
      :confirmLoading="confirmLoading">
      <a-form-model :model="userType" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
        <a-form-model-item label="盈亏状态" prop="type" :rules="{ required: true }">
          <a-radio-group v-model="userType.type">
            <a-radio value="win"> 盈利 </a-radio>
            <a-radio value="loss"> 亏损 </a-radio>
            <a-radio value="normal"> 正常 </a-radio>
          </a-radio-group>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </a-card>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { memberList,upMemberType,userDetail } from '@/api/manage'
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
    title: '姓名',
    dataIndex: 'realName'
  },
  {
    title: '身份证',
    dataIndex: 'idNo'
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
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return memberList(requestParameters)
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
    modifyType(record) {
      this.userType.id = record.id
      this.userType.type = record.type
      console.log(this.userType)
      this.typeVisible = true
    },
    typeUpOk() {
      upMemberType(this.userType).then(() => {
          this.typeVisible = false
          this.$refs.table.refresh(true)
          this.upUserModel = {}
        })
        .catch(() => {
          this.visible = false
          this.upUserModel = {}
        })
    },
    typeUpCance() {
      this.typeVisible = false
      this.userType = {}
    },
    detailUser(record) {
      userDetail(record.id).then(res => {
        this.$message.success('查询成功')
        this.$refs.table.refresh(true)
      })
    }

  }
}
</script>
