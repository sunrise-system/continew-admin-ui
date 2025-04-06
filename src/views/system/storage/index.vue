<template>
  <GiPageLayout>
    <a-tabs v-model:active-key="activeKey" type="rounded" @change="change">
      <a-tab-pane key="all">
        <template #title>全部</template>
        <a-card title="本地存储" :bordered="false" class="gi_card_title">
          <StorageLocal :data="dataMap.local" :loading="loading" @save-success="getDataList" />
        </a-card>
        <a-card title="对象存储" :bordered="false" class="gi_card_title">
          <StorageOss :data="dataMap.oss" :loading="loading" @save-success="getDataList" />
        </a-card>
      </a-tab-pane>
      <a-tab-pane key="local">
        <template #title>本地存储</template>
        <StorageLocal :data="dataMap.local" :loading="loading" @save-success="getDataList" />
      </a-tab-pane>
      <a-tab-pane key="oss">
        <template #title>对象存储</template>
        <StorageOss :data="dataMap.oss" :loading="loading" @save-success="getDataList" />
      </a-tab-pane>
      <template #extra>
        <a-input-search
          v-model="queryForm.description"
          placeholder="搜索名称/编码"
          style="width: 240px;"
          allow-clear
          @search="getDataList"
        />
      </template>
    </a-tabs>
  </GiPageLayout>
</template>

<script setup lang="ts">
import { groupBy } from 'xe-utils'
import StorageLocal from './StorageLocal.vue'
import StorageOss from './StorageOss.vue'
import { type StorageQuery, type StorageResp, listStorage } from '@/apis'
import { parseData, parseList } from '@/utils'

defineOptions({ name: 'SystemStorage' })

const queryForm = reactive<StorageQuery>({
  sort: ['sysCreatedTime,desc'],
  type: ''
})

const loading = ref(false)
const dataMap = ref<Record<string, StorageResp[]>>({})
// 查询列表
const getDataList = async () => {
  try {
    loading.value = true
    const { data } = await listStorage(queryForm)
    dataMap.value = groupBy(parseList(data), 'type')
  } finally {
    loading.value = false
  }
}

const activeKey = ref('all')
const change = (key: string | number) => {
  activeKey.value = key as string
  queryForm.type = key === 'all' ? undefined : key
  getDataList()
}

onMounted(() => {
  getDataList()
})
</script>

<style scoped lang="scss">
.gi_table_page {
  overflow-y: auto;

  :deep(.arco-tabs) {
    overflow: visible;
  }
}

.block-title {
  font-size: 14px;
  margin-bottom: 12px;
}

:deep(.gi_card_title > .arco-card-body) {
  padding: 0;
}
</style>
