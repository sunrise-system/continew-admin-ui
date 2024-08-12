export interface MenuForm {
  type: 1 | 2 | 3
  icon: string
  title: string
  sort: number
  permission: string
  path: string
  name: string
  component: string
  redirect: string
  isExternal: boolean
  isCache: boolean
  isHidden: boolean
  pid: string
  status: 1 | 0
}
