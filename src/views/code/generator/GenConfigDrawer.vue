<template>
  <a-drawer
    v-model:visible="visible"
    :title="title"
    :mask-closable="false"
    :esc-to-close="false"
    :width="width >= 1350 ? 1350 : '100%'"
    @before-ok="save"
    @close="reset"
  >
    <a-tabs v-model:active-key="activeKey">
      <a-tab-pane key="1" title="生成配置">
        <GiForm ref="formRef" v-model="form" :columns="formColumns" />
      </a-tab-pane>
      <a-tab-pane key="2" title="字段配置">
        <GiTable
          row-key="tableName"
          :data="dataList"
          :columns="columns"
          :loading="loading"
          :scroll="{ x: '100%', y: 800, minWidth: 900 }"
          :pagination="false"
          :draggable="{ type: 'handle', width: 40 }"
          :disabled-tools="['setting', 'refresh']"
          :disabled-column-keys="['tableName']"
          @change="handleChangeSort"
        >
          <template #toolbar-left>
            <a-popconfirm
              content="是否确定同步最新数据表结构？同步后只要不点击确定保存，则不影响原有配置数据。"
              type="warning"
              @ok="handleRefresh(form.tableName)"
            >
              <a-tooltip content="同步最新数据表结构">
                <a-button
                  type="primary"
                  status="success"
                  size="small"
                  title="同步"
                  :disabled="dataList.length !== 0 && dataList[0].sysCreatedTime == null"
                >
                  <template #icon><icon-sync /></template>同步
                </a-button>
              </a-tooltip>
            </a-popconfirm>
          </template>
          <template #fieldName="{ record }">
            <a-input v-model="record.fieldName" />
          </template>
          <template #fieldType="{ record }">
            <a-select
              v-model="record.fieldType"
              placeholder="请选择字段类型"
              allow-search
              allow-create
              :error="!record.fieldType"
            >
              <a-option value="String">String</a-option>
              <a-option value="Integer">Integer</a-option>
              <a-option value="Long">Long</a-option>
              <a-option value="Float">Float</a-option>
              <a-option value="Double">Double</a-option>
              <a-option value="Boolean">Boolean</a-option>
              <a-option value="BigDecimal">BigDecimal</a-option>
              <a-option value="LocalDate">LocalDate</a-option>
              <a-option value="LocalTime">LocalTime</a-option>
              <a-option value="LocalDateTime">LocalDateTime</a-option>
            </a-select>
          </template>
          <template #comment="{ record }">
            <a-input v-model="record.comment" />
          </template>
          <template #showInList="{ record }">
            <a-checkbox v-model="record.showInList" value="true" />
          </template>
          <template #showInForm="{ record }">
            <a-checkbox v-model="record.showInForm" value="true" />
          </template>
          <template #isRequired="{ record }">
            <a-checkbox v-if="record.showInForm" v-model="record.isRequired" value="true" />
            <a-checkbox v-else disabled />
          </template>
          <template #showInQuery="{ record }">
            <a-checkbox v-model="record.showInQuery" value="true" />
          </template>
          <template #formType="{ record }">
            <a-select
              v-if="record.showInForm || record.showInQuery"
              v-model="record.formType"
              :options="form_type_enum"
              :default-value="1"
              placeholder="请选择表单类型"
            />
            <span v-else>无需设置</span>
          </template>
          <template #queryType="{ record }">
            <a-select
              v-if="record.showInQuery"
              v-model="record.queryType"
              :options="query_type_enum"
              :default-value="1"
              placeholder="请选择查询方式"
            />
            <span v-else>无需设置</span>
          </template>
          <template #dictCode="{ record }">
            <a-select
              v-model="record.dictCode"
              :options="dictList"
              placeholder="请选择字典类型"
              allow-search
              allow-clear
            />
          </template>
        </GiTable>
      </a-tab-pane>
    </a-tabs>
  </a-drawer>
</template>

<script setup lang="ts">
import type { TableInstance } from '@arco-design/web-vue'
import { Message } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import { type FieldConfigResp, type GeneratorConfigResp, getGenConfig, listFieldConfig, listFieldConfigDict, saveGenConfig } from '@/apis/code/generator'
import type { LabelValueState } from '@/types/global'
import { type ColumnItem, GiForm } from '@/components/GiForm'
import { useResetReactive } from '@/hooks'
import { useDict } from '@/hooks/app'
import { parseData } from '@/utils'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const { width } = useWindowSize()

const title = ref('')
const visible = ref(false)
const activeKey = ref('1')
const formRef = ref<InstanceType<typeof GiForm>>()
const { form_type_enum, query_type_enum } = useDict('form_type_enum', 'query_type_enum')
const dictList = ref<LabelValueState[]>([])

const [form, resetForm] = useResetReactive({
  isOverride: false,
})
const formColumns: ColumnItem[] = reactive([
  {
    label: '名称',
    field: 'description',
    type: 'input',
    props: {
      placeholder: '业务功能名称',
      maxLength: 50,
    },
    rules: [{ required: true, message: '请输入业务功能名称' }],
  },
  {
    label: '业务功能代码',
    field: 'activityId',
    type: 'input',
    props: {
      placeholder: '请输入业务功能代码.例如：ADM0NNNNA.',
      maxLength: 60,
    },
    rules: [{ required: true, message: '请输入业务功能代码' }],
  },
  {
    label: '数据表名称',
    field: 'tableName',
    type: 'input',
    props: {
      placeholder: '数据表名称',
      maxLength: 50,
    },
  },
  {
    label: '启用',
    field: 'isActive',
    type: 'switch',
    props: {
      type: 'round',
      checkedValue: true,
      uncheckedValue: false,
      checkedText: '启用',
      uncheckedText: '禁用',
    },
  },
])

const dataList = ref<FieldConfigResp[]>([])
const loading = ref(false)
// 查询列表数据
const getDataList = async (activityId: string, requireSync: boolean) => {
  try {
    loading.value = true
    const { data } = await listFieldConfig(activityId, requireSync)
    dataList.value = data
  } finally {
    loading.value = false
  }
}

// Table 字段配置
const columns: TableInstance['columns'] = [
  { title: '名称', slotName: 'fieldName' },
  { title: '类型', slotName: 'fieldType' },
  { title: '描述', slotName: 'comment', width: 170 },
  { title: '列表', slotName: 'showInList', width: 60, align: 'center' },
  { title: '表单', slotName: 'showInForm', width: 60, align: 'center' },
  { title: '必填', slotName: 'isRequired', width: 60, align: 'center' },
  { title: '查询', slotName: 'showInQuery', width: 60, align: 'center' },
  { title: '表单类型', slotName: 'formType' },
  { title: '查询方式', slotName: 'queryType' },
  { title: '关联字典', slotName: 'dictCode' },
]

// 重置
const reset = () => {
  formRef.value?.formRef?.resetFields()
  resetForm()
}

// 同步
const handleRefresh = async (activityId: string) => {
  await getDataList(activityId, true)
}

// 拖拽排序
const handleChangeSort = (newDataList: FieldConfigResp[]) => {
  dataList.value = newDataList
}

// 保存
const save = async () => {
  try {
    const isInvalid = await formRef.value?.formRef?.validate()
    if (isInvalid) {
      activeKey.value = '1'
      return false
    }
    await saveGenConfig(form.activityId, {
      genConfig: form,
      fieldConfigs: dataList.value,
    } as GeneratorConfigResp)
    Message.success('保存成功')
    emit('save-success')
    return true
  } catch (error) {
    return false
  }
}

// 打开
const onOpen = async (activityId: string, description: string) => {
  reset()
  description = description ? `（${description}）` : ' '
  title.value = `${activityId}${description}配置`
  // 查询生成配置
  const { data } = await getGenConfig(activityId)
  Object.assign(form, parseData(data))
  form.isOverride = form.isOverride || false
  visible.value = true
  // 查询字段配置
  await getDataList(activityId, false)
  const res = await listFieldConfigDict()
  dictList.value = res.data
}

defineExpose({ onOpen })
</script>

<style scoped lang="scss">
:deep(.gen-config.arco-form) {
  width: 50%;
}
</style>
