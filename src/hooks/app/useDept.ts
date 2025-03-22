import { ref } from 'vue'
import type { TreeNodeData } from '@arco-design/web-vue'
import { listDeptTree } from '@/apis'

/** 部门模块 */
export function useDept(options?: { onSuccess?: () => void }) {
  const loading = ref(false)
  const deptList = ref<TreeNodeData[]>([])

  const getDeptList = async (name?: string) => {
    try {
      loading.value = true
      const res = await listDeptTree({ description: name })
      if (res.data && res.data.data) {
        deptList.value = res.data.data.list
      } else {
        deptList.value = res.data.data
      }
      options?.onSuccess && options.onSuccess()
    } finally {
      loading.value = false
    }
  }
  return { deptList, getDeptList, loading }
}
