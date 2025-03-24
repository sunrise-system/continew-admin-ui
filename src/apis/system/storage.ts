import type * as T from './type'
import http, { fetchMotion, fnMotion } from '@/utils/http'

export type * from './type'

const BASE_URL = '/system/storage'

/** @desc 查询存储列表 */
export function listStorage(query: T.StorageQuery) {
  return fetchMotion(`ADM08914A/list`, query)

  //  return http.get<T.StorageResp[]>(`${BASE_URL}/list`, query)
}

/** @desc 查询存储详情 */
export function getStorage(id: string) {
  return http.get<T.StorageResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增存储 */
export function addStorage(data: any) {
  return fnMotion(`ADM08914A/savechanges`, data, '')
}

/** @desc 修改存储 */
export function updateStorage(data: any, id: string) {
  return fnMotion(`ADM08914A/savechanges`, data, id)
}

/** @desc 删除存储 */
export function deleteStorage(id: string) {
  return http.del(`${BASE_URL}/${id}`)
}

/** @desc 修改存储状态 */
export function updateStorageStatus(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}/status`, data)
}

/** @desc 设置默认存储 */
export function setDefaultStorage(id: string) {
  return http.put(`${BASE_URL}/${id}/default`)
}
