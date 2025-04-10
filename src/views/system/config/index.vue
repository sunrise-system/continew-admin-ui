<template>
  <div class="gi_table_page">
<a-tabs v-model:active-key="activeKey" type="card-gutter" size="large" @change="change">
      <a-tab-pane key="site">
        <template #title><icon-apps /> 网站配置</template>
      </a-tab-pane>
      <a-tab-pane key="security">
        <template #title><icon-safe /> 安全配置</template>
      </a-tab-pane>
      <a-tab-pane key="mail">
        <template #title><icon-email /> 邮件配置</template>
      </a-tab-pane>
      <a-tab-pane key="login">
        <template #title><icon-lock /> 登录配置</template>
      </a-tab-pane>
    </a-tabs>
    <keep-alive>
      <component :is="PanMap[activeKey]" />
    </keep-alive>

    <EDesigner
    ref="designerRef"
    form-mode
    title="表单模式示例"
    @save="handleSubmit"
  >
    <template #header-prefix>
      <div>欢迎使用EpicDesigner设计器</div>
    </template>
  </EDesigner>
</div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import type { PageSchema } from '@epic-designer/types'
import { ref } from 'vue'
import { EDesigner } from '@epic-designer/core'
import SiteSetting from './components/SiteSetting.vue'
import SecuritySetting from './components/SecuritySetting.vue'
import MailSetting from './components/MailSetting.vue'
import LoginSetting from './components/LoginSetting.vue'

defineOptions({ name: 'SystemConfig' })
const designerRef = ref<InstanceType<typeof EDesigner>>()
/**
 * 点击保存按钮操作
 * @param e
 */
function handleSubmit(e: PageSchema) {
  console.log(e)
}
const pageSchema = {
  schemas: [
    {
      componentProps: {
        style: {
          padding: '16px',
        },
      },
      id: 'root',
      label: '页面',
      type: 'page',
      children: [
        {
          label: '表单',
          type: 'form',
          icon: 'epic-icon-daibanshixiang',
          componentProps: {
            colon: true,
            hideRequiredMark: false,
            labelAlign: 'right',
            labelCol: {
              span: 5,
            },
            labelLayout: 'fixed',
            labelWidth: 100,
            layout: 'horizontal',
            name: 'default',
            size: 'middle',
            wrapperCol: {
              span: 19,
            },
          },
          children: [
            {
              label: '栅格布局',
              type: 'row',
              icon: 'epic-icon-zhage',
              children: [
                {
                  type: 'col',
                  children: [
                    {
                      label: '姓名',
                      type: 'input',
                      field: 'input_2drzm924',
                      icon: 'epic-icon-write',
                      input: true,
                      componentProps: {
                        bordered: true,
                        placeholder: '请输入',
                      },
                      id: 'input_2drzm924',
                    },
                  ],
                  componentProps: {
                    span: 12,
                  },
                  id: 'col_m17ttkgz',
                },
                {
                  type: 'col',
                  children: [
                    {
                      label: '年龄',
                      type: 'number',
                      icon: 'epic-icon-number',
                      field: 'number_x4t431jb',
                      input: true,
                      componentProps: {
                        placeholder: '请输入',
                        style: {
                          width: '100%',
                        },
                      },
                      id: 'number_x4t431jb',
                    },
                  ],
                  componentProps: {
                    span: 12,
                  },
                  id: 'col_6uvxdrme',
                },
              ],
              id: 'row_fpuoo21a',
            },
            {
              label: '性别',
              type: 'radio',
              icon: 'epic-icon-danxuan-cuxiantiao',
              field: 'radio_shndnr9b',
              input: true,
              componentProps: {
                defaultValue: '男',
                options: [
                  {
                    label: '男',
                    value: '男',
                  },
                  {
                    label: '女',
                    value: '女',
                  },
                ],
                optionType: 'default',
              },
              id: 'radio_shndnr9b',
            },
            {
              label: '兴趣',
              type: 'checkbox',
              icon: 'epic-icon-duoxuan1',
              field: 'checkbox_1l91io8k',
              input: true,
              componentProps: {
                options: [
                  {
                    label: '唱',
                    value: '唱',
                  },
                  {
                    label: '跳',
                    value: '跳',
                  },
                  {
                    label: 'rap',
                    value: 'rap',
                  },
                  {
                    label: '篮球',
                    value: '篮球',
                  },
                ],
              },
              id: 'checkbox_1l91io8k',
            },
            {
              label: '个人简介',
              type: 'textarea',
              field: 'textarea_1ihmowjl',
              icon: 'epic-icon-edit',
              input: true,
              componentProps: {
                autoSize: {
                  minRows: 4,
                },
                placeholder: '请输入',
              },
              id: 'textarea_1ihmowjl',
            },
          ],
          id: 'form_eifo73no',
        },
      ],
    },
  ],
  script:
    'const { defineExpose, find } = epic;\n\nfunction test (){\n    console.log(\'test\')\n}\n\n// 通过defineExpose暴露的函数或者属性\ndefineExpose({\n test \n})',
}

onMounted(() => {
  designerRef.value?.setData(pageSchema)
})

const PanMap: Record<string, Component> = {
  site: SiteSetting,
  security: SecuritySetting,
  mail: MailSetting,
  login: LoginSetting,
}

const route = useRoute()
const router = useRouter()
const activeKey = ref('site')
watch(
  () => route.query,
  () => {
    if (route.query.tab) {
      activeKey.value = String(route.query.tab)
    }
  },
  { immediate: true },
)
const change = (key: string | number) => {
  activeKey.value = key as string
  router.replace({ path: route.path, query: { tab: key } })
}
</script>

<style scoped lang="scss">
.gi_table_page {
  overflow-y: auto;

  :deep(.arco-tabs) {
    overflow: visible;
  }
}

:deep(.arco-tabs .arco-tabs-nav-type-card-gutter .arco-tabs-tab-active) {
  box-shadow: inset 0 2px 0 rgb(var(--primary-6)), inset -1px 0 0 var(--color-border-2),
  inset 1px 0 0 var(--color-border-2);
  position: relative;
}

:deep(.arco-tabs-nav-type-card-gutter .arco-tabs-tab) {
  border-radius: var(--border-radius-medium) var(--border-radius-medium) 0 0;
}

:deep(.arco-tabs-type-card-gutter > .arco-tabs-content) {
  border: none;
}

:deep(.arco-tabs-nav::before) {
  left: -20px;
  right: -20px;
}

:deep(.arco-tabs) {
  overflow: visible;
}

:deep(.arco-tabs-nav) {
  overflow: visible;
}
</style>
