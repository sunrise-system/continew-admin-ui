import type * as T from './type'
import http, { fetchMotion, fnMotion } from '@/utils/http'

export type * from './type'

const BASE_URL = '/system/menu'

/** @desc 查询菜单列表 */
export function listMenu(query: T.MenuQuery) {
  query.bTree = true
  return fetchMotion(`ADM08906A/list`, query)

  //  return http.get<T.MenuResp[]>(`${BASE_URL}/tree`, query)
}

/** @desc 查询菜单详情 */
export function getMenu(id: string) {
  const formArray: any = {}
  formArray.id = id
  return fetchMotion(`ADM08906A`, formArray)
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

/** @desc 清除菜单缓存 */
export function clearMenuCache() {
  return http.del(`${BASE_URL}/cache`)
}
