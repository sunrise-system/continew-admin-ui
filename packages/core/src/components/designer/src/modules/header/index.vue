<script lang="ts" setup>
import type { DesignerProps } from '@nada-designer/types';

import type { Ref } from 'vue';

import { inject } from 'vue';

import { NadaIcon } from '@nada-designer/base-ui';
import { pluginManager } from '@nada-designer/utils';

const emits = defineEmits(['save', 'reset', 'preview']);
const Button = pluginManager.getComponent('button');
const designerProps = inject('designerProps') as Ref<DesignerProps>;

/**
 * 预览
 */
function handlePreview() {
  emits('preview');
}

/**
 * 触发保存操作
 */
function handleSave() {
  emits('save');
}
</script>
<template>
  <header class="nada-header relative">
    <div class="nada-header-item flex flex-1 items-center">
      <slot name="prefix">
        <a
          class="decoration-none flex items-center"
          href="https://github.com/Kchengz/nada-designer"
          target="_blank"
        >
          <img
            src="../../../../../static/logo.png"
            class="w-18px h-18px"
            alt=""
            srcset=""
          />
          <span class="ml-3">EpicDesigner</span>
        </a>
      </slot>
    </div>

    <div class="nada-header-item text-12px flex flex-1 justify-center">
      <slot name="title">
        {{ designerProps.title }}
      </slot>
    </div>
    <div class="nada-header-item flex flex-1 items-center justify-end">
      <slot name="right-prefix"></slot>
      <slot name="right-action">
        <div>
          <Button size="small" @click="handlePreview">
            <span class="flex! h-full items-center">
              <NadaIcon name="icon--nada--eye" class="mr-4px" />
              预览
            </span>
          </Button>
        </div>
        <div class="ml-2">
          <Button size="small" @click="handleSave">
            <span class="flex! h-full items-center">
              <NadaIcon
                name="icon--nada--save-outline-rounded"
                class="mr-4px"
              />
              保存
            </span>
          </Button>
        </div>
      </slot>
      <slot name="right-suffix"></slot>
    </div>
  </header>
</template>
