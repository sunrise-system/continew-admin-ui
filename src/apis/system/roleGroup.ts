import type * as T from './type'
import http, { fetchMotion, fnMotion } from '@/utils/http'

export type * from './type'

const BASE_URL = '/system/role'

/** @desc 查询角色列表 */
export function listRoleGroup(query: T.RoleQuery) {
  return fetchMotion(`ADM08902B/list`, query)

  // return http.get<T.RoleResp[]>(`${BASE_URL}/list`, query)
}

/** @desc 查询角色详情 */
export function getRoleGroup(id: string) {
  const formArray: any = {}
  formArray.id = id
  return fetchMotion(`ADM08902B`, formArray)
}

/** @desc 新增角色 */
export function addRoleGroup(data: any) {
  const formArray: any = {}
  formArray.data = data
  return fetchMotion(`ADM08902B/savechanges`, formArray)
}

/** @desc 修改角色 */
export function updateRoleGroup(data: any, id: string) {
  const formArray: any = {}
  formArray.data = data
  formArray.id = id
  return fetchMotion(`ADM08902B/savechanges`, formArray)
}

/** @desc 删除角色 */
export function deleteRoleGroup(ids: string | Array<string>) {
  return http.del(`${BASE_URL}/${ids}`)
}

/** @desc 修改角色权限 */
export function updateRoleGroupPermission(id: string, data: any) {
  return http.put(`${BASE_URL}/${id}/permission`, data)
}
