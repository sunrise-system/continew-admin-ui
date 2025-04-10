<script lang="ts" setup>
import type {
  ComponentSchema,
  Designer,
  PageSchema,
} from '@nada-designer/types';

import { computed, inject, provide, useAttrs } from 'vue';

import { NadaNode } from '@nada-designer/base-ui';
import { pluginManager } from '@nada-designer/utils';

import NadaNodes from './nodes.vue';

defineOptions({
  name: 'NadaNodeItem',
});
const props = withDefaults(
  defineProps<{
    draggable?: boolean;
    schema: ComponentSchema;
  }>(),
  {
    draggable: true,
  },
);
const attrs = useAttrs();
const designer = inject('designer') as Designer;
const pageSchema = inject('pageSchema', {}) as PageSchema;

provide('nodeAttrs', attrs);
// 判断是否为叶子节点
const isLeaf = computed(() => !props.schema.children);

function setSelectedNode(event: Event) {
  event.stopPropagation();
  designer.setSelectedNode(props.schema);
}

function setHoverNode(event: Event) {
  event.stopPropagation();
  designer.setHoverNode(props.schema);
}

function isDraggable() {
  const schema = props.schema;
  // 判断当前节点类型是否允许拖拽
  if (
    !props.draggable ||
    schema.id === pageSchema.schemas[0]?.id ||
    pluginManager.getComponentConfingByType(schema.type)?.editConstraints
      ?.immovable
  ) {
    // 禁止拖拽
    return 'nada-unmover-item';
  }

  return 'nada-draggable-item';
}
</script>
<template>
  <div
    class="edit-draggable-widget"
    :class="[isDraggable(), isLeaf ? 'nada-node-mask' : '']"
    @click.stop="setSelectedNode"
    @mouseover.stop="setHoverNode"
  >
    <NadaNode :component-schema="props.schema">
      <!-- childImmovable不可拖拽设计 start -->
      <template
        v-if="
          pluginManager.getComponentConfingByType(props.schema.type)
            ?.editConstraints?.childImmovable
        "
        #edit-node
      >
        <NadaNodeItem
          v-for="node in props.schema.children"
          :key="node.id"
          :schema="node"
          :draggable="false"
        />
      </template>
      <!-- childImmovable不可拖拽设计 end -->

      <template v-else #edit-node>
        <NadaNodes
          v-if="props.schema.children"
          v-model:schemas="props.schema.children"
        />
      </template>
    </NadaNode>
  </div>
</template>
