import type * as T from './type'
import http, { fetchMotion, fnMotion } from '@/utils/http'

export type * from './type'

const BASE_URL = '/system/dept'

/** @desc 查询部门列表 */
export function listDept(query: T.DeptQuery) {
  // return http.get<T.DeptResp[]>(`${BASE_URL}/tree`, query)
  query.bTree = true
  return fetchMotion(`ADM08907A/list`, query)
}

/** @desc 查询部门详情 */
export function getDept(id: string) {
  const formArray = {}
  formArray.Id = id
  return fetchMotion(`ADM08907A`, formArray)

  //  return http.get<T.DeptResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增部门 */
export function addDept(data: any) {
  const formArray: any = {}
  formArray.data = data
  return fetchMotion(`ADM08907A/savechanges`, formArray)
}

/** @desc 修改部门 */
export function updateDept(data: any, id: string) {
  const formArray: any = {}
  formArray.data = data
  formArray.Id = id
  return fetchMotion(`ADM08907A/savechanges`, formArray)
}

/** @desc 删除部门 */
export function deleteDept(id: string) {
  const formArray: any = {}
  formArray.Id = id
  return fetchMotion(`ADM08907A/delete`, formArray)
}

/** @desc 导出部门 */
export function exportDept(query: T.DeptQuery) {
  return http.download(`${BASE_URL}/export`, query)
}
