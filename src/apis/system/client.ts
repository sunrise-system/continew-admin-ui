import type * as T from './type'
import http, { fetchMotion } from '@/utils/http'

export type * from './type'

/** @desc 查询客户端列表 */
export function listClient(query: T.ClientPageQuery) {
  return fetchMotion(`ADM08921A/list`, query)
}

/** @desc 查询客户端详情 */
export function getClient(id: string) {
  const formArray: any = {}
  formArray.id = id
  return fetchMotion(`ADM08921A`, formArray)
}

/** @desc 新增客户端 */
export function addClient(data: any) {
  const formArray: any = {}
  formArray.data = data
  return fetchMotion(`ADM08921A/savechanges`, formArray)
}

/** @desc 修改客户端 */
export function updateClient(data: any, id: string) {
  const formArray: any = {}
  formArray.data = data
  formArray.id = id
  return fetchMotion(`ADM08921A/savechanges`, formArray)
}

/** @desc 删除客户端 */
export function deleteClient(id: string) {
  const formArray: any = {}
  formArray.id = id
  return fetchMotion(`ADM08921A/delete`, formArray)
}
