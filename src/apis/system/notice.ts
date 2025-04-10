import type * as T from './type'
import http, { fetchMotion } from '@/utils/http'

export type * from './type'

const BASE_URL = '/system/notice'

/** @desc 查询公告列表 */
export function listNotice(query: T.NoticePageQuery) {
  return fetchMotion(`ADM08916A/list`, query)

  // return http.get<PageRes<T.NoticeResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询公告详情 */
export function getNotice(id: string) {
  const formArray: any = {}
  formArray.id = id
  return fetchMotion(`ADM08916A`, formArray)
}

/** @desc 新增公告 */
export function addNotice(data: any) {
  const formArray: any = {}
  formArray.data = data
  return fetchMotion(`ADM08916A/savechanges`, formArray)
}

/** @desc 修改公告 */
export function updateNotice(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除公告 */
export function deleteNotice(ids: string | Array<number>) {
  const formArray: any = {}
  formArray.id = ids
  return fetchMotion(`ADM08916A/delete`, formArray)
}
