import type * as T from './type'
import http, { fetchMotion, fnMotion } from '@/utils/http'

export type * from './type'

const BASE_URL = '/system/storage'

/** @desc 查询存储列表 */
export function listStorage(query: T.StorageQuery) {
  return fetchMotion(`ADM08914A/list`, query)
}

/** @desc 查询存储详情 */
export function getStorage(id: string) {
  const formArray: any = {}
  formArray.id = id

  return fetchMotion(`ADM08914A`, formArray)
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
  const formArray: any = {}
  formArray.id = id
  return fetchMotion(`ADM08914A/delete`, formArray)
}

/** @desc 修改存储状态 */
export function updateStorageStatus(data: any, id: string) {
  const formArray: any = {}
  formArray.id = id
  formArray.data = data
  return fetchMotion(`ADM08914A/status`, formArray)
}

/** @desc 设置默认存储 */
export function setDefaultStorage(id: string) {
  const formArray: any = {}
  formArray.id = id
  return fetchMotion(`ADM08914A/default`, formArray)
}
