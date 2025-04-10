<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { ComponentSchema } from '@nada-designer/types';
import { NButton, NModal, NSpace } from 'naive-ui';
// 定义 props
const props = withDefaults(
  defineProps<{
    componentSchema?: ComponentSchema;
    hideConfirm?: boolean;
    okText?: string;
    width?: string;
  }>(),
  {
    componentSchema: () => ({
      type: 'modal',
    }),
    okText: '确定',
    width: '900px',
  },
);

// Emits
const emit = defineEmits(['ok', 'close', 'update:modelValue']);

const attrs = useAttrs();

// 计算属性
const getComponentProps = computed<Record<string, any>>(() => ({
  ...props.componentSchema,
  class: 'nada-modal-n',
  preset: 'card',
  show: attrs.modelValue,
  title: props.componentSchema?.label ?? '',
}));

const children = computed(() => props.componentSchema?.children ?? []);

// 方法
const handleOk = () => {
  emit('ok');
};

const handleClose = () => {
  emit('update:modelValue', false);
  emit('close');
};
</script>

<template>
  <NModal
    v-bind="getComponentProps"
    :title="getComponentProps.label ?? ''"
    class="nada-modal-n nada-scoped"
    preset="card"
    :style="{ width }"
    @update:show="handleClose"
  >
    <div class="nada-modal-main">
      <slot>
        <slot name="edit-node">
          <template v-if="children.length > 0">
            <slot
              v-for="node in children"
              name="node"
              :component-schema="node"
            ></slot>
          </template>
        </slot>
      </slot>
    </div>

    <div class="nada-modal-footer">
      <NSpace justify="end">
        <NButton @click="handleClose"> 关闭 </NButton>
        <NButton v-if="!props.hideConfirm" type="primary" @click="handleOk">
          {{ props.okText }}
        </NButton>
      </NSpace>
    </div>
  </NModal>
</template>
