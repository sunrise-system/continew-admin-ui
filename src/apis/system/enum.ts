import type * as T from './type'
import http, { fetchMotion, fnMotion } from '@/utils/http'

export type * from './type'

const BASE_URL = '/system/enum'

/** @desc 查询字典列表 */
export function listEnum(query?: T.DictQuery) {
  return fetchMotion(`ADM08919A/list`, query)

  // return http.get<T.DictResp[]>(`${BASE_URL}/list`, query)
}

/** @desc 查询字典详情 */
export function getEnum(id: string) {
  return http.get<T.DictResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增字典 */
export function addEnum(data: any) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改字典 */
export function updateEnum(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除字典 */
export function deleteEnum(id: string) {
  return http.del(`${BASE_URL}/${id}`)
}

/** @desc 清除字典缓存 */
export function clearEnumCache(code: string) {
  return http.del(`${BASE_URL}/cache/${code}`)
}

/** @desc 查询字典项列表 */
export function listEnumItem(query: T.DictItemPageQuery) {
  return http.get<PageRes<T.DictItemResp[]>>(`${BASE_URL}/item`, query)
}

/** @desc 查询字典项详情 */
export function getEnumItem(id: string) {
  return http.get<T.DictItemResp>(`${BASE_URL}/item/${id}`)
}

/** @desc 新增字典项 */
export function addEnumItem(data: any) {
  return http.post(`${BASE_URL}/item`, data)
}

/** @desc 修改字典项 */
export function updateEnumItem(data: any, id: string) {
  return http.put(`${BASE_URL}/item/${id}`, data)
}

/** @desc 删除字典项 */
export function deleteEnumItem(id: string) {
  return http.del(`${BASE_URL}/item/${id}`)
}
