import type * as T from './type'
import http, { fetchMotion } from '@/utils/http'

export type * from './type'

const BASE_URL = '/open/app'

/** @desc 查询应用列表 */
export function listApp(query: T.AppPageQuery) {
  return fetchMotion(`ADM08917A/list`, query)
}

/** @desc 查询应用详情 */
export function getApp(id: string) {
  const formArray: any = {}
  formArray.id = id
  return fetchMotion(`ADM08917A`, formArray)
}

/** @desc 新增应用 */
export function addApp(data: any) {
  const formArray: any = {}
  formArray.data = data
  return fetchMotion(`ADM08917A/savechanges`, formArray)
}

/** @desc 修改应用 */
export function updateApp(data: any, id: string) {
  const formArray: any = {}
  formArray.data = data
  formArray.id = id
  return fetchMotion(`ADM08917A/savechanges`, formArray)
}

/** @desc 删除应用 */
export function deleteApp(id: string) {
  const formArray: any = {}
  formArray.id = id
  return fetchMotion(`ADM08917A/delete`, formArray)
}

/** @desc 导出应用 */
export function exportApp(query: T.AppQuery) {
  return http.download(`${BASE_URL}/export`, query)
}

/** @desc 获取密钥 */
export function getAppSecret(id: string) {
  const formArray: any = {}
  formArray.id = id
  return fetchMotion(`ADM08917A`, formArray)
}

/** @desc 重置密钥 */
export function resetAppSecret(id: string) {
  const formArray: any = {}
  formArray.id = id
  return fetchMotion(`ADM08917A/reset`, formArray)
}
