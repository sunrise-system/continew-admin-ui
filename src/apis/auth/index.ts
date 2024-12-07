import type * as T from './type'
import http, { fnMotion } from '@/utils/http'

export type * from './type'

const BASE_URL = '/auth'

/** @desc 账号登录 */
export function accountLogin(req: any) {
  return fnMotion(`ADM08901A`, req)
}

/** @desc 手机号登录 */
export function phoneLogin(req: T.PhoneLoginReq) {
  return http.post<T.LoginResp>(`${BASE_URL}/phone`, req)
}

/** @desc 邮箱登录 */
export function emailLogin(req: T.EmailLoginReq) {
  return http.post<T.LoginResp>(`${BASE_URL}/email`, req)
}

/** @desc 三方账号登录 */
export function socialLogin(source: string, req: any) {
  return http.post<T.LoginResp>(`/oauth/${source}`, req)
}

/** @desc 三方账号登录授权 */
export function socialAuth(source: string) {
  return http.get<T.SocialAuthAuthorizeResp>(`/oauth/${source}`)
}

/** @desc 退出登录 */
export function logout() {
  return fnMotion(`ADM08901A/logout`)  
}

/** @desc 获取用户信息 */
export const getUserInfo = () => {
  return fnMotion(`ADM08903A`, {})
}

/** @desc 获取路由信息 */
export const getUserRoute = () => {
  return fnMotion(`ADM08906A`, {})
}
