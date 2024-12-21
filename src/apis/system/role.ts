import type * as T from './type'
import http, { fnMotion } from '@/utils/http'

export type * from './type'

const BASE_URL = '/system/role'

/** @desc 查询角色列表 */
export function listRole(query: T.RolePageQuery) {
  return fnMotion(`ADM08902A/list`, query)
}

/** @desc 查询角色详情 */
export function getRole(data: any) {
  return fnMotion(`ADM08902A`, data)
  //return http.get<T.RoleDetailResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增角色 */
export function addRole(data: any) {
  return fnMotion(`ADM08902A/savechanges`, data)
}

/** @desc 修改角色 */
export function updateRole(data: any, id: string) {
  return fnMotion(`ADM08902A/savechanges`, data, id)
}

/** @desc 删除角色 */
export function deleteRole(ids: string | Array<string>) {
  return fnMotion(`ADM08902A/delete`, {}, ids)
}

/** @desc 查询角色关联用户 */
export function listRoleUsers(id: string) {
  return http.get(`${BASE_URL}/${id}/user`)
}

/** @desc 分配角色给用户 */
export function assignToUsers(id: string, userIds: Array<string>) {
  return http.post(`${BASE_URL}/${id}/user`, userIds)
}
