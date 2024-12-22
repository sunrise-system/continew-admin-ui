import type * as T from './type'
import http, { fnMotion } from '@/utils/http'

export type * from './type'

const BASE_URL = '/system/menu'

/** @desc 查询菜单列表 */
export function listMenu(query: T.MenuQuery) {
  return http.get<T.MenuResp[]>(`${BASE_URL}/tree`, query)
}

/** @desc 查询菜单详情 */
export function getMenu(id: string) {
  return fnMotion(`ADM08906A`, {}, id)
}

/** @desc 新增菜单 */
export function addMenu(data: any) {
  return fnMotion(`ADM08906A/savechanges`, data, null)
}

/** @desc 修改菜单 */
export function updateMenu(data: any, id: string) {
  return fnMotion(`ADM08906A/savechanges`, data, id)
}

/** @desc 删除菜单 */
export function deleteMenu(id: string) {
  return fnMotion(`ADM08902A/delete`, {}, id)
}
