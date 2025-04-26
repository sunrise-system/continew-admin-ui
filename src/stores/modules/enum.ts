import { defineStore } from 'pinia'

const storeSetup = () => {
  const enumData = ref<Record<string, App.EnumItem[]>>({})

  // 设置字典
  const setEnum = (code: string, items: App.EnumItem[]) => {
    if (code) {
      enumData.value[code] = items
    }
  }

  // 获取字典
  const getEnum = (code: string) => {
    if (!code) {
      return null
    }
    return enumData.value[code] || null
  }

  // 删除字典
  const deleteEnum = (code: string) => {
    if (!code || !(code in enumData.value)) {
      return false
    }
    delete enumData.value[code]
    return true
  }

  // 清空字典
  const cleanEnum = () => {
    enumData.value = {}
  }

  return {
    enumData,
    setEnum,
    getEnum,
    deleteEnum,
    cleanEnum,
  }
}

export const useEnumStore = defineStore('enum', storeSetup)
