import http from '@/utils/http'

const BASE_URL = '/activity'

/** @desc 行为/动作 */
export function fnMotion(sUrl: string, formArray: any) {
  let data={}
  data.data=formArray;

  return http.post(`${BASE_URL}${sUrl}`, data)
}
