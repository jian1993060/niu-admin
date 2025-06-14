import request from '@/utils/request'
import { axios } from '@/utils/request'

const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree'
}

export default api

export function getUserList (parameter) {
  return request({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

export function getRoleList (parameter) {
  return request({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList (parameter) {
  return request({
    url: api.service,
    method: 'get',
    params: parameter
  })
}

export function getPermissions (parameter) {
  return request({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

export function getOrgTree (parameter) {
  return request({
    url: api.orgTree,
    method: 'get',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService (parameter) {
  return request({
    url: api.service,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter
  })
}

export function saveSub (sub) {
  return request({
    url: '/sub',
    method: sub.id === 0 ? 'post' : 'put',
    data: sub
  })
}

/**
 * 会员管理列表
 * @param {*} parameter
 * @returns
 */
export function memberList (parameter) {
    return request({
        url: '/user/list',
        method: 'post',
        data: parameter
    })
}

export function upMemberType (parameter) {
  return request({
      url: '/user/update/type',
      method: 'post',
      data: parameter
  })
}

export function userDetail (parameter) {
  return request({
      url: '/user/detail/'+parameter,
      method: 'post',
      data: parameter
  })
}

export function updateBalance (parameter) {
  return request({
      url: '/user/update/balance',
      method: 'post',
      data: parameter
  })
}



/**
 * 提现列表
 * @param {*} parameter
 * @returns
 */
export function withdrawList (parameter) {
    return request({
        url: '/withdraw/list',
        method: 'post',
        data: parameter
    })
}
/**
 * 提现
 * @param {*} parameter
 * @returns
 */
export function withdrawFinish (parameter) {
    return request({
        url: '/withdraw/finish',
        method: 'post',
        data: parameter
    })
}

/**
 * 实名
 * @param {*} parameter
 * @returns
 */
export function realList (parameter) {
  return request({
      url: '/real/list',
      method: 'post',
      data: parameter
  })
}

export function realFinish (parameter) {
  return request({
      url: '/real/finish',
      method: 'post',
      data: parameter
  })
}


export function rechargeList (parameter) {
    return request({
        url: '/recharge/list ',
        method: 'post',
        data: parameter
    })
}

export function verifyRecharge (parameter) {
  return request({
      url: '/recharge/verify', 
      method: 'post',
      data: parameter
  })
}

/**
 * 订单列表
 * @param {*} parameter
 * @returns
 */
export function orderList (parameter) {
    return request({
        url: 'order/list',
        method: 'post',
        data: parameter
    })
}
export function finishOrder (parameter) {
  return request({
      url: 'order/finish/'+parameter,
      method: 'post',
      data: parameter
  })
}


/**
 * 股票
 * @param {*} parameter
 * @returns
 */
export function stockList (parameter) {
  return request({
    url: 'stock/list',
    method: 'post',
    data: parameter
  })
}

/**
 *秒合约管理
 * @param {*} parameter
 * @returns
 */
export function secondList (parameter) {
  return request({
      url: 'second/list',
      method: 'post',
      data: parameter
  })
}
export function secondOrderList (parameter) {
  return request({
      url: 'second/order/list',
      method: 'post',
      data: parameter
  })
}

export function secondEdit (parameter) {
  return request({
      url: 'second/update',
      method: 'post',
      data: parameter
  })
}

export function secondDel (parameter) {
  return request({
      url: 'second/del/'+parameter,
      method: 'post',
      data: parameter
  })
}

/**
 *云挖矿
 * @param {*} parameter
 * @returns
 */
 export function cloudList (parameter) {
  return request({
      url: 'cloud/list',
      method: 'post',
      data: parameter
  })
}
export function cloudOrderList (parameter) {
  return request({
      url: 'cloud/order/list',
      method: 'post',
      data: parameter
  })
}

export function cloudEdit (parameter) {
  return request({
      url: 'cloud/update',
      method: 'post',
      data: parameter
  })
}

export function cloudDel (parameter) {
  return request({
      url: 'cloud/del/'+parameter,
      method: 'post',
      data: parameter
  })
}

export function addUserBalance (parameter) {
  return request({
      url: 'user/update/balance',
      method: 'post',
      data: parameter
  })
}

export function createStock (data) {
  return axios({
    url: '/stock/create',
    method: 'post',
    data: data
  })
}

export function financeList (parameter) {
  return axios({
    url: '/finance/list',
    method: 'post',
    data: parameter
  })
}




