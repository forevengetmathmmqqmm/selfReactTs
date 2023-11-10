export enum headerKeys {
  personal = 'personal',
  setting = 'setting',
  logout = 'logout',
}
export enum userReduce {
  token = 'Token',
  userInfo = 'UserInfo',
  userId = 'userId'
}
export enum appReduce {
  selectedKeys = 'SelectedKeys'
}

export enum web3Reduce {
  wallet = 'Wallet'
}
// 操作
export enum Options {
  edit = 'edit',
  add = 'add',
  view = 'view',
  audit = 'audit'
}

export const OptionsMap = new Map([['edit', '编辑'],['add', '添加'],['view', '查看'],['audit', '审核']])

// 审核状态
export enum AuditStatus {
  noAudit = 0,
  auditing, 
  pass,
  reject,
}

export const AuditStatusMap = new Map([[0, '未审核'],[1, '待审核'], [2, '通过'], [3, '审核拒绝']])

// 活动类型
export enum ActivityType {
  rapActivity = 1,
  investmentActivity,
  regularActivity,
}
export const ActivityMap = new Map([[1, '说唱活动'], [2, '投资活动'], [3, '普通活动']])
