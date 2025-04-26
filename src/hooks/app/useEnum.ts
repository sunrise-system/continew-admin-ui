import { ref, toRefs } from 'vue'
import { listEnumItem } from '@/apis'
import { useEnumStore } from '@/stores'
import { parseList } from '@/utils'

const pendingRequests = new Map<string, Promise<any>>()

export function useEnum(...codes: string[]) {
  const enumStore = useEnumStore()
  const enumData = ref<Record<string, App.DictItem[]>>({})

  codes.forEach(async (code) => {
    enumData.value[code] = []

    const cached = enumStore.getEnum(code)
    if (cached) {
      enumData.value[code] = cached
      return
    }

    if (!pendingRequests.has(code)) {
      const query: any = {}
      query.categoryId = code
      const request = listEnumItem(query)
        .then(({ data }) => {
          const v = parseList(data)
          enumStore.setEnum(code, v)
          return v
        })
        .catch((error) => {
          console.error(`Failed to load dict: ${code}`, error)
          return []
        })
        .finally(() => {
          pendingRequests.delete(code)
        })

      pendingRequests.set(code, request)
    }

    pendingRequests.get(code)!.then((data) => {
      enumData.value[code] = data
    })
  })

  return toRefs(enumData.value)
}
