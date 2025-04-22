<template>
  <GiPageLayout>
    <template #left>
      <EnumTree @node-click="handleSelectDict" />
    </template>
    <a-row align="stretch" :gutter="14" class="h-full page_content">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" :xxl="24" flex="1" class="h-full overflow-hidden">
        <GiTable
          row-key="id"
          :data="dataList"
          :columns="columns"
          :loading="loading"
          :scroll="{ x: '100%', y: '100%', minWidth: 600 }"
          :pagination="pagination"
          :disabled-tools="['size']"
          :disabled-column-keys="['label']"
          @refresh="search"
        >
          <template #toolbar-left>
            <a-input-search v-model="queryForm.description" placeholder="搜索标签/描述" allow-clear @search="search" />
            <a-button @click="reset">
              <template #icon><icon-refresh /></template>
              <template #default>重置</template>
            </a-button>
          </template>
          <template #toolbar-right>
            <a-button v-permission="['system:dict:item:create']" type="primary" @click="onAdd">
              <template #icon><icon-plus /></template>
              <template #default>新增</template>
            </a-button>
            <a-button v-permission="['system:dict:item:clearCache']" type="outline" status="warning" @click="onClearCache">
              <template #icon><icon-delete /></template>
              <template #default>清除缓存</template>
            </a-button>
          </template>
          <template #label="{ record }">
            <a-tag v-if="record.color === 'primary'" color="arcoblue">{{ record.label }}</a-tag>
            <a-tag v-else-if="record.color === 'success'" color="green">{{ record.label }}</a-tag>
            <a-tag v-else-if="record.color === 'warning'" color="orangered">{{ record.label }}</a-tag>
            <a-tag v-else-if="record.color === 'error'" color="red">{{ record.label }}</a-tag>
            <a-tag v-else-if="record.color === 'default'" color="gray">{{ record.label }}</a-tag>
          </template>
          <template #status="{ record }">
            <GiCellStatus :status="record.status" />
          </template>
          <template #action="{ record }">
            <a-space>
              <a-link v-permission="['system:dict:item:update']" title="修改" @click="onUpdate(record)">修改</a-link>
              <a-link
                v-permission="['system:dict:item:delete']"
                status="danger"
                title="删除"
                @click="onDelete(record)"
              >
                删除
              </a-link>
            </a-space>
          </template>
        </GiTable>
      </a-col>
    </a-row>

    <EnumItemAddModal ref="EnumItemAddModalRef" @save-success="search" />
  </GiPageLayout>
</template>

<script setup lang="ts">
import type { TableInstance } from '@arco-design/web-vue'
import { Message, Modal } from '@arco-design/web-vue'
import EnumTree from './tree/index.vue'
import EnumItemAddModal from './EnumItemAddModal.vue'
import { type EnumItemQuery, type EnumItemResp, clearEnumCache, deleteEnumItem, listEnumItem } from '@/apis/system/enum'
import { useTable } from '@/hooks'
import { isMobile } from '@/utils'
import has from '@/utils/has'

defineOptions({ name: 'SystemEnum' })

const queryForm = reactive<EnumItemQuery>({
  id: '',
  categoryId: '',
  sort: ['sysCreatedTime,desc'],
})

const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete,
} = useTable((page) => listEnumItem({ ...queryForm, ...page }), { immediate: false })
const columns: TableInstance['columns'] = [
  {
    title: '序号',
    width: 66,
    align: 'center',
    render: ({ rowIndex }) => h('span', {}, rowIndex + 1 + (pagination.current - 1) * pagination.pageSize),
  },
  { title: '标签', dataIndex: 'label', slotName: 'label', minWidth: 100, align: 'center' },
  { title: '值', dataIndex: 'value', minWidth: 100, align: 'center', ellipsis: true, tooltip: true },
  { title: '状态', dataIndex: 'status', slotName: 'status', align: 'center' },
  {
    title: '排序',
    dataIndex: 'sort',
    align: 'center',
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  { title: '描述', dataIndex: 'description', minWidth: 130, ellipsis: true, tooltip: true },
  { title: '创建人', dataIndex: 'sysCreatedBy', width: 140, ellipsis: true, tooltip: true, show: false },
  { title: '创建时间', dataIndex: 'sysCreatedTime', width: 180 },
  { title: '修改人', dataIndex: 'updateUserString', width: 140, ellipsis: true, tooltip: true, show: false },
  { title: '修改时间', dataIndex: 'sysLastModifiedTime', width: 180, show: false },
  {
    title: '操作',
    dataIndex: 'action',
    slotName: 'action',
    width: 130,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['system:dict:item:update', 'system:dict:item:delete']),
  },
]

// 重置
const reset = () => {
  queryForm.description = undefined
  queryForm.status = undefined
  search()
}

// 删除
const onDelete = (record: EnumItemResp) => {
  return handleDelete(() => deleteEnumItem(record.id), {
    content: `是否确定删除字典项「${record.label}」？`,
    showModal: true,
  })
}

const enumName = ref()
const enumCode = ref()
// 清除缓存
const onClearCache = () => {
  if (!enumCode.value) {
    return Message.warning('请先选择字典')
  }
  Modal.warning({
    title: '提示',
    content: `是否确定清除字典「${enumName.value}(${enumCode.value})」缓存？`,
    hideCancel: false,
    maskClosable: false,
    onOk: async () => {
      await clearEnumCache(enumCode.value)
      Message.success('清除成功')
    },
  })
}

// 根据选中字典查询
const handleSelectDict = (Enum: { categoryId: string, name: string, code: string }) => {
  queryForm.categoryId = Enum.categoryId
  enumName.value = Enum.name
  enumCode.value = Enum.code
  search()
}

const EnumItemAddModalRef = ref<InstanceType<typeof EnumItemAddModal>>()
// 新增
const onAdd = () => {
  EnumItemAddModalRef.value?.onAdd(queryForm.categoryId)
}

// 修改
const onUpdate = (record: EnumItemResp) => {
  EnumItemAddModalRef.value?.onUpdate(record.id)
}
</script>

<style scoped lang="scss">
.page_header {
  flex: 0 0 auto;
}

.page_content {
  flex: 1;
  overflow: auto;
}
</style>
