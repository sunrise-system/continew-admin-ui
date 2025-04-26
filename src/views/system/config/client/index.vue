<template>
  <GiPageLayout :margin="false" :body-style="{ padding: 0 }">
    <GiTable
      row-key="id"
      :data="dataList"
      :columns="columns"
      :loading="loading"
      :scroll="{ x: '100%', y: '100%', minWidth: 900 }"
      :pagination="pagination"
      :disabled-tools="['size']"
      :disabled-column-keys="['clientKey']"
      @refresh="search"
    >
      <template #toolbar-left>
        <a-select
          v-model="queryForm.clientType"
          :options="client_type"
          placeholder="请选择客户端类型"
          allow-clear
          style="width: 160px"
          :field-names="{ value: 'id', label: 'name' }"
          @change="search"
        />
        <a-select
          v-model="queryForm.status" :options="DisEnableStatusList" placeholder="请选择状态" allow-clear
          style="width: 150px"
          @change="search"
        />
        <a-button @click="reset">
          <template #icon><icon-refresh /></template>
          <template #default>重置</template>
        </a-button>
      </template>
      <template #toolbar-right>
        <a-button v-permission="['system:client:create']" type="primary" @click="onAdd">
          <template #icon><icon-plus /></template>
          <template #default>新增</template>
        </a-button>
      </template>
      <template #action="{ record }">
        <a-space>
          <a-link v-permission="['system:client:get']" title="详情" @click="onDetail(record)">详情</a-link>
          <a-link v-permission="['system:client:update']" title="修改" @click="onUpdate(record)">修改</a-link>
          <a-link
            v-permission="['system:client:delete']"
            status="danger"
            :disabled="record.disabled"
            :title="record.disabled ? '不可删除' : '删除'"
            @click="onDelete(record)"
          >
            删除
          </a-link>
        </a-space>
      </template>
    </GiTable>

    <ClientAddModal ref="ClientAddModalRef" @save-success="search" />
    <ClientDetailDrawer ref="ClientDetailDrawerRef" />
  </GiPageLayout>
</template>

<script setup lang="tsx">
import type { LabelValue } from '@arco-design/web-vue/es/tree-select/interface'
import type { TableInstance } from '@arco-design/web-vue'
import ClientAddModal from './ClientAddModal.vue'
import ClientDetailDrawer from './ClientDetailDrawer.vue'
import { type ClientQuery, type ClientResp, deleteClient, listClient } from '@/apis/system/client'
import { DisEnableStatusList } from '@/constant/common'
import { useTable } from '@/hooks'
import { useEnum } from '@/hooks/app'
import { isMobile } from '@/utils'
import has from '@/utils/has'
import CellCopy from '@/components/CellCopy/index.vue'
import GiCellTag from '@/components/GiCell/GiCellTag.vue'
import GiCellTags from '@/components/GiCell/GiCellTags.vue'
import GiCellBoolean from '@/components/GiCell/GiCellBoolean.vue'

defineOptions({ name: 'SystemClient' })

const {
  client_type,
  auth_type_enum,
} = useEnum('client_type', 'auth_type_enum')

const queryForm = reactive<ClientQuery>({
  clientType: '',
  authType: [] as string[],
  status: '',
  sort: ['id,desc'],
})
const formatAuthType = (data: string[]) => {
  return data.map((item: string) => {
    return auth_type_enum.value.find((d) => d.code === item)?.name
  })
}

const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete,
} = useTable((page) => listClient({ ...queryForm, ...page }), { immediate: true })
const columns: TableInstance['columns'] = [
  {
    title: '客户端 ID',
    dataIndex: 'id',
    slotName: 'id',
    ellipsis: true,
    tooltip: true,
    render: ({ record }) => {
      return (
        <CellCopy content={record.id} />
      )
    },
  },
  {
    title: '客户端类型',
    dataIndex: 'clientType',
    slotName: 'clientType',
    ellipsis: true,
    tooltip: true,
    align: 'center',
    render: ({ record }) => {
      return <GiCellTag value={record.clientType} option={client_type.value} />
    },
  },
  {
    title: '认证类型',
    dataIndex: 'authType',
    slotName: 'authType',
    ellipsis: true,
    tooltip: true,
    align: 'center',
    render: ({ record }) => {
      return (
        <GiCellTags data={formatAuthType(record.authType)} />
      )
    },
  },
  { title: 'Token 最低活跃频率', dataIndex: 'activeTimeout', slotName: 'activeTimeout', width: 180, align: 'center', render: ({ record }) => `${record.activeTimeout} 秒` },
  { title: 'Token 有效期', dataIndex: 'timeout', slotName: 'timeout', align: 'center', render: ({ record }) => `${record.timeout} 秒` },
  {
    title: '状态',
    dataIndex: 'isActive',
    slotName: 'isActive',
    align: 'center',
    render: ({ record }) => {
      return <GiCellBoolean isActive={record.isActive} />
    },
  },
  {
    title: '操作',
    dataIndex: 'action',
    slotName: 'action',
    width: 160,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['system:client:get', 'system:client:update', 'system:client:delete']),
  },
]

// 重置
const reset = () => {
  queryForm.clientType = ''
  queryForm.authType = []
  queryForm.status = ''
  search()
}

// 删除
const onDelete = (record: ClientResp) => {
  return handleDelete(() => deleteClient(record.id), {
    content: `是否确定删除客户端「${record.id}」？`,
    showModal: true,
  })
}

const ClientAddModalRef = ref<InstanceType<typeof ClientAddModal>>()
// 新增
const onAdd = () => {
  ClientAddModalRef.value?.onAdd()
}

// 修改
const onUpdate = (record: ClientResp) => {
  ClientAddModalRef.value?.onUpdate(record.id)
}

const ClientDetailDrawerRef = ref<InstanceType<typeof ClientDetailDrawer>>()
// 详情
const onDetail = (record: ClientResp) => {
  ClientDetailDrawerRef.value?.onOpen(record.id)
}
</script>

<style scoped lang="scss"></style>
