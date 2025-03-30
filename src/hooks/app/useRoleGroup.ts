import { ref } from 'vue'
import { listRoleGroupDict } from '@/apis'
import type { LabelValueState } from '@/types/global'
import { parseList } from '@/utils'

/** 角色模块 */
export function useRoleGroup(options?: { onSuccess?: () => void }) {
  const loading = ref(false)
  const roleGroupList = ref<LabelValueState[]>([])

  const getRoleGroupList = async () => {
    try {
      loading.value = true
      const res = await listRoleGroupDict()
      roleGroupList.value = parseList(res.data)
      options?.onSuccess && options.onSuccess()
    } finally {
      loading.value = false
    }
  }
  return { roleGroupList, getRoleGroupList, loading }
}
