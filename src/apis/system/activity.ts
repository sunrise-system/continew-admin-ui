import type * as System from './type'
import http from '@/utils/http'

const BASE_URL = '/activity'

/** @desc 行为/动作 */
export function fnMotion(sUrl: string, data: any) {
  return http.post(`${BASE_URL}${sUrl}`, data)
}
