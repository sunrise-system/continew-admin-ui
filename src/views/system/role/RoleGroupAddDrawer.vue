<template>
  <a-drawer
    v-model:visible="visible"
    :title="title"
    :mask-closable="false"
    :esc-to-close="false"
    :width="width >= 500 ? 500 : '100%'"
    @before-ok="save"
    @close="reset"
  >
    <a-form ref="formRef" :model="form" :rules="rules" size="large" auto-label-width>
      <fieldset>
        <legend>基础信息</legend>
        <a-form-item label="编码" field="code">
          <a-input v-model.trim="form.code" placeholder="请输入编码" :max-length="30" show-word-limit :disabled="isUpdate" />
        </a-form-item>
        <a-form-item label="名称" field="name">
          <a-input v-model.trim="form.name" placeholder="请输入名称" :max-length="30" show-word-limit />
        </a-form-item>
        <a-form-item label="请输入描述" field="description">
          <a-input v-model.trim="form.description" placeholder="请输入请输入描述" :max-length="30" show-word-limit />
        </a-form-item>
        <a-form-item label="排序" field="sequency">
          <a-input-number v-model="form.sequency" placeholder="请输入排序" :min="1" mode="button" />
        </a-form-item>
      </fieldset>
    </a-form>
  </a-drawer>
</template>

<script setup lang="ts">
import { type FormInstance, Message, type TreeNodeData } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import type { GiForm } from '@/components/GiForm'

import { useResetReactive } from '@/hooks'
import { addRoleGroup, getRoleGroup, updateRoleGroup } from '@/apis'
import { isMobile, parseData } from '@/utils'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const { width } = useWindowSize()

const dataId = ref('')
const visible = ref(false)
const isUpdate = computed(() => !!dataId.value)
const title = computed(() => (isUpdate.value ? '修改角色组' : '新增角色组'))
const formRef = ref<InstanceType<typeof GiForm>>()

const rules: FormInstance['rules'] = {
  name: [{ required: true, message: '请输入名称' }],
  code: [{ required: true, message: '请输入编码' }],
}

const [form, resetForm] = useResetReactive({
  deptCheckStrictly: true,
  sequency: 999,
  code: '',
  name: '',
  description: '',
})

const deptTreeRef = ref()
const isDeptExpanded = ref(true)
const isDeptCheckAll = ref(false)
// 重置
const reset = () => {
  isDeptExpanded.value = true
  isDeptCheckAll.value = false
  deptTreeRef.value?.expandAll(isDeptExpanded.value)
  deptTreeRef.value?.checkAll(false)
  formRef.value?.resetFields()
  resetForm()
}

// 获取所有选中的部门
const getDeptAllCheckedKeys = () => {
  if (!deptTreeRef.value) {
    return []
  }
  // 获取目前被选中的部门
  const checkedNodes = deptTreeRef.value?.getCheckedNodes()
  const checkedKeys = checkedNodes.map((item: TreeNodeData) => item.key)
  // 获取半选中的部门
  const halfCheckedNodes = deptTreeRef.value?.getHalfCheckedNodes()
  const halfCheckedKeys = halfCheckedNodes.map((item: TreeNodeData) => item.key)
  checkedKeys.unshift(...halfCheckedKeys)
  return checkedKeys
}

// 保存
const save = async () => {
  const isInvalid = await formRef.value?.validate()
  if (isInvalid) return false
  try {
    form.deptIds = getDeptAllCheckedKeys()
    if (isUpdate.value) {
      await updateRoleGroup(form, dataId.value)
      Message.success('修改成功')
    } else {
      await addRoleGroup(form)
      Message.success('新增成功')
    }
    emit('save-success')
    return true
  } catch (error) {
    return false
  }
}

// 新增
const onAdd = async () => {
  reset()
  dataId.value = ''
  visible.value = true
}

// 修改
const onUpdate = async (id: string) => {
  reset()
  dataId.value = id
  const { data } = await getRoleGroup(id)
  Object.assign(form, parseData(data))
  data.deptIds?.forEach((node) => {
    nextTick(() => {
      deptTreeRef.value?.checkNode(node, true, true)
    })
  })
  visible.value = true
}

defineExpose({ onAdd, onUpdate })
</script>

<style scoped lang="scss">
fieldset {
  padding: 15px 15px 0 15px;
  margin-bottom: 15px;
  border: 1px solid var(--color-neutral-3);
  border-radius: 3px;
}
fieldset legend {
  color: rgb(var(--gray-10));
  padding: 2px 5px 2px 5px;
  border: 1px solid var(--color-neutral-3);
  border-radius: 3px;
}
</style>
