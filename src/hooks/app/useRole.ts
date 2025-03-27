import { ref } from 'vue'
import { listRoleDict } from '@/apis'
import type { LabelValueState } from '@/types/global'
import { parseList } from '@/utils'

/** 角色模块 */
export function useRole(options?: { onSuccess?: () => void }) {
  const loading = ref(false)
  const roleList = ref<LabelValueState[]>([])

  const getRoleList = async () => {
    try {
      loading.value = true
      const res = await listRoleDict()
      roleList.value = parseList(res.data)
      options?.onSuccess && options.onSuccess()
    } finally {
      loading.value = false
    }
  }
  return { roleList, getRoleList, loading }
}
