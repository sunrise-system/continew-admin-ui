import type * as T from './type'
import http, { fetchMotion, fnMotion } from '@/utils/http'

export type * from './type'

const BASE_URL = '/system/role'

/** @desc 查询角色列表 */
export function listRole(query: T.RoleQuery) {
  return fetchMotion(`ADM08902A/list`, query)

  // return http.get<T.RoleResp[]>(`${BASE_URL}/list`, query)
}

/** @desc 查询用户列表 */
export function listUserWORole(query: T.UserPageQuery) {
  return fetchMotion(`ADM08902D/list`, query)
}

/** @desc 查询角色详情 */
export function getRole(id: string) {
  const formArray: any = {}
  formArray.id = id
  return fetchMotion(`ADM08902A`, formArray)
}

/** @desc 新增角色 */
export function addRole(data: any) {
  const formArray: any = {}
  formArray.data = data
  return fetchMotion(`ADM08902A/savechanges`, formArray)
}

/** @desc 修改角色 */
export function updateRole(data: any, id: string) {
  const formArray: any = {}
  formArray.data = data
  formArray.id = id
  return fetchMotion(`ADM08902A/savechanges`, formArray)
}

/** @desc 删除角色 */
export function deleteRole(ids: string | Array<string>) {
  return http.del(`${BASE_URL}/${ids}`)
}

/** @desc 修改角色权限 */
export function updateRolePermission(id: string, data: any) {
  const formArray: any = {}
  formArray.data = data
  formArray.roleId = id
  return fetchMotion(`ADM08902C/permission`, formArray)
}

/** @desc 查询角色关联用户 */
export function listRoleUser(id: string, query: T.RoleUserPageQuery) {
  const formArray: any = {}
  formArray.data = query
  formArray.id = id
  return fetchMotion(`ADM08902C/list`, formArray)

  //  return http.get<PageRes<T.RoleUserResp[]>>(`${BASE_URL}/${id}/user`, query)
}

/** @desc 分配角色给用户 */
export function assignToUsers(roleId: string, userIds: Array<string>) {
  const formArray: any = {}
  formArray.data = {}
  formArray.data.userId = userIds
  formArray.roleId = roleId
  return fetchMotion(`ADM08902C/assignuser`, formArray)
}

/** @desc 取消分配角色给用户 */
export function unassignUsers(id: string, ids: Array<string | number>) {
  const formArray: any = {}
  formArray.data = ids
  formArray.id = id
  return fetchMotion(`ADM08902C/delete`, formArray)
}

/** @desc 查询角色关联用户 ID */
export function listRoleUserId(id: string) {
  return http.get(`${BASE_URL}/${id}/user/id`)
}
