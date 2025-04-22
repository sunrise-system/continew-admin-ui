import type * as T from './type'
import http, { fetchMotion, fnMotion } from '@/utils/http'

export type * from './type'

const BASE_URL = '/system/enum'

/** @desc 查询字典列表 */
export function listEnum(query?: T.EnumQuery) {
  return fetchMotion(`ADM08919A/list`, query)
}

/** @desc 查询字典详情 */
export function getEnum(id: string) {
  const formArray: any = {}
  formArray.id = id
  return fetchMotion(`ADM08919A`, formArray)
}

/** @desc 新增字典 */
export function addEnum(data: any) {
  const formArray: any = {}
  formArray.data = data
  return fetchMotion(`ADM08919A/savechanges`, formArray)
}

/** @desc 修改字典 */
export function updateEnum(data: any, id: string) {
  const formArray: any = {}
  formArray.data = data
  formArray.id = id
  return fetchMotion(`ADM08919A/savechanges`, formArray)
}

/** @desc 删除字典 */
export function deleteEnum(id: string) {
  const formArray: any = {}
  formArray.id = id
  return fetchMotion(`ADM08919A/delete`, formArray)
}

/** @desc 清除字典缓存 */
export function clearEnumCache(code: string) {
  return http.del(`${BASE_URL}/cache/${code}`)
}

/** @desc 查询字典项列表 */
export function listEnumItem(query: T.EnumItemPageQuery) {
  return fetchMotion(`ADM08920A/list`, query)

  // return http.get<PageRes<T.DictItemResp[]>>(`${BASE_URL}/item`, query)
}

/** @desc 查询字典项详情 */
export function getEnumItem(id: string) {
  const formArray: any = {}
  formArray.id = id
  return fetchMotion(`ADM08920A`, formArray)
}

/** @desc 新增字典项 */
export function addEnumItem(data: any) {
  const formArray: any = {}
  formArray.data = data
  return fetchMotion(`ADM08920A/savechanges`, formArray)
}

/** @desc 修改字典项 */
export function updateEnumItem(data: any, id: string) {
  const formArray: any = {}
  formArray.data = data
  formArray.id = id
  return fetchMotion(`ADM08920A/savechanges`, formArray)
}

/** @desc 删除字典项 */
export function deleteEnumItem(id: string) {
  const formArray: any = {}
  formArray.id = id
  return fetchMotion(`ADM08920A/delete`, formArray)
}
