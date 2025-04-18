import type * as T from './type'
import http, { fetchMotion } from '@/utils/http'

export type * from './type'

/** @desc 查询消息列表 */
export function listMessage(query: T.MessagePageQuery) {
  const formArray: any = {}
  formArray.data = query
  return fetchMotion(`ADM08918A/list`, formArray)
}

/** @desc 删除消息 */
export function deleteMessage(ids: Array<string>) {
  const formArray: any = {}
  formArray.id = ids
  return fetchMotion(`ADM08918A/delete`, formArray)
}

/** @desc 标记已读 */
export function readMessage(ids: Array<string>) {
  const formArray: any = {}
  formArray.id = ids
  return fetchMotion(`ADM08918A/mark_read`, formArray)
}

/** @desc 全部已读 */
export function readAllMessage() {
  return fetchMotion(`ADM08918A/mark_all_reads`, {})
}

/** @desc 查询未读消息数量 */
export function getUnreadMessageCount() {
  return fetchMotion(`ADM08918A/unread`, {})
}
