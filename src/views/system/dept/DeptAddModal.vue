<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :mask-closable="false"
    :esc-to-close="false"
    :width="width >= 500 ? 500 : '100%'"
    draggable
    @before-ok="save"
    @close="reset"
  >
    <GiForm ref="formRef" v-model="form" :columns="columns" />
  </a-modal>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import { mapTree } from 'xe-utils'
import { type DeptResp, addDept, getDept, updateDept } from '@/apis/system/dept'
import { type ColumnItem, GiForm } from '@/components/GiForm'
import { useResetReactive } from '@/hooks'
import { parseData } from '@/utils'

interface Props {
  depts: DeptResp[]
}
const props = withDefaults(defineProps<Props>(), {
  depts: () => [],
})

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const { width } = useWindowSize()

const dataId = ref('')
const visible = ref(false)
const isUpdate = computed(() => !!dataId.value)
const title = computed(() => (isUpdate.value ? '修改部门' : '新增部门'))
const formRef = ref<InstanceType<typeof GiForm>>()

// 转换为部门树
const deptSelectTree = computed(() => {
  return JSON.parse(JSON.stringify(props.depts)) as DeptResp[]
})

const [form, resetForm] = useResetReactive({
  sequency: 999,
  parentId: '',
  isActive: false,
})

const columns: ColumnItem[] = reactive([
  {
    label: '上级部门',
    field: 'parentId',
    type: 'tree-select',
    span: 24,
    props: {
      data: deptSelectTree,
      allowClear: true,
      allowSearch: true,
      fieldNames: {
        key: 'id',
        title: 'name',
        children: 'children'
      },
      fallbackOption: false,
      filterTreeNode(searchKey, nodeData) {
        if (nodeData.name) {
          return nodeData.name?.toLowerCase().includes(searchKey.toLowerCase())
        }
        return false
      },
    },
    rules: [{ required: true, message: '请选择上级部门' }],
    hide: (form) => {
      return form.parentId === '-'
    },
  },
  {
    label: '名称',
    field: 'name',
    type: 'input',
    span: 24,
    props: {
      maxLength: 30,
    },
    rules: [{ required: true, message: '请输入名称' }],
  },
  {
    label: '编码',
    field: 'code',
    type: 'input',
    span: 24,
    props: {
      maxLength: 30,
    },
    rules: [{ required: true, message: '请输入编码' }],
  },
  {
    label: '描述',
    field: 'description',
    type: 'input',
    span: 24,
  },
  {
    label: '排序',
    field: 'sequency',
    type: 'input-number',
    span: 24,
    props: {
      min: 1,
      mode: 'button',
    },
  },
  {
    label: '状态',
    field: 'isActive',
    type: 'switch',
    span: 24,
    props: {
      type: 'round',
      checkedValue: true,
      uncheckedValue: false,
      checkedText: '启用',
      uncheckedText: '禁用',
    },
  },
])

// 重置
const reset = () => {
  formRef.value?.formRef?.resetFields()
  resetForm()
}

// 保存
const save = async () => {
  try {
    const isInvalid = await formRef.value?.formRef?.validate()
    if (isInvalid) return false
    if (isUpdate.value) {
      await updateDept(form, dataId.value)
      Message.success('修改成功')
    } else {
      await addDept(form)
      Message.success('新增成功')
    }
    emit('save-success')
    return true
  } catch (error) {
    return false
  }
}

// 新增
const onAdd = (id?: string) => {
  reset()
  form.parentId = id
  form.isActive = true
  dataId.value = ''
  visible.value = true
}

// 修改
const onUpdate = async (id: string) => {
  reset()
  dataId.value = id
  const { data } = await getDept(id)
  Object.assign(form, parseData(data))
  visible.value = true
}

defineExpose({ onAdd, onUpdate })
</script>

<style scoped lang="scss"></style>
