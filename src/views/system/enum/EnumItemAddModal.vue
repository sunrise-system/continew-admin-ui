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
    <GiForm ref="formRef" v-model="form" :columns="columns">
      <template #color>
        <a-select
          v-model="form.color"
          placeholder="请选择颜色"
          allow-clear
        >
          <a-option value="primary"><a-tag color="arcoblue">主要（极致蓝）</a-tag></a-option>
          <a-option value="success"><a-tag color="green">成功（仙野绿）</a-tag></a-option>
          <a-option value="warning"><a-tag color="orangered">警告（活力橙）</a-tag></a-option>
          <a-option value="error"><a-tag color="red">错误（浪漫红）</a-tag></a-option>
          <a-option value="default"><a-tag color="gray">默认（中性灰）</a-tag></a-option>
        </a-select>
      </template>
    </GiForm>
  </a-modal>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import { addEnumItem, getEnumItem, updateEnumItem } from '@/apis/system/enum'
import { type ColumnItem, GiForm } from '@/components/GiForm'
import { useResetReactive } from '@/hooks'
import { parseData } from '@/utils'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const { width } = useWindowSize()

const dataId = ref('')
const categoryId = ref('')
const visible = ref(false)
const isUpdate = computed(() => !!dataId.value)
const title = computed(() => (isUpdate.value ? '修改字典项' : '新增字典项'))
const formRef = ref<InstanceType<typeof GiForm>>()

const [form, resetForm] = useResetReactive({
  categoryId: '',
  sort: 999,
  status: 1,
})

const columns: ColumnItem[] = reactive([
  {
    label: '名称',
    field: 'name',
    type: 'input',
    span: 24,
    required: true,
    props: {
      maxLength: 30,
    },
  },
  {
    label: '编码',
    field: 'code',
    type: 'input',
    span: 24,
    required: true,
    props: {
      maxLength: 30,
    },
  },
  {
    label: '颜色',
    field: 'color',
    type: 'input',
    span: 24,
  },
  {
    label: '排序',
    field: 'sort',
    type: 'input-number',
    span: 24,
    props: {
      min: 1,
      mode: 'button',
    },
  },
  {
    label: '描述',
    field: 'description',
    type: 'textarea',
    span: 24,
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
      await updateEnumItem(form, dataId.value)
      Message.success('修改成功')
    } else {
      await addEnumItem({ ...form, categoryId: categoryId.value })
      Message.success('新增成功')
    }
    emit('save-success')
    return true
  } catch (error) {
    return false
  }
}

// 新增
const onAdd = (id: string) => {
  reset()
  dataId.value = ''
  categoryId.value = id
  visible.value = true
}

// 修改
const onUpdate = async (id: string) => {
  reset()
  dataId.value = id
  const { data } = await getEnumItem(id)
  Object.assign(form, parseData(data))
  visible.value = true
}

defineExpose({ onAdd, onUpdate })
</script>

<style scoped lang="scss"></style>
