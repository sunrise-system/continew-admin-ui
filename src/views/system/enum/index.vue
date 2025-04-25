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
  { title: '名称', dataIndex: 'name', slotName: 'name', minWidth: 60, align: 'center' },
  { title: '编码', dataIndex: 'code', minWidth: 60, align: 'center', ellipsis: true, tooltip: true },
  { title: '状态', dataIndex: 'status', slotName: 'status', align: 'center' },
  { title: '描述', dataIndex: 'description', minWidth: 130, ellipsis: true, tooltip: true },
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
    content: `是否确定删除字典项「${record.name}」？`,
    showModal: true,
  })
}

const enumName = ref()
const enumCode = ref()

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
