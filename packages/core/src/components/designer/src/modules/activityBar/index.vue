<script lang="ts" setup>
import type { ActivitybarModel } from '@nada-designer/types';

import { computed, ref, shallowRef } from 'vue';

import { NadaIcon } from '@nada-designer/base-ui';
import { pluginManager } from '@nada-designer/utils';

defineOptions({
  name: 'EActivityBar',
});
const activitybars = computed(() => {
  return pluginManager.getActivitybars.value
    .filter((item) => item.visible)
    .sort((a, b) => {
      return a.sort! - b.sort!;
    });
});

const activityBarCheckedIndex = ref<null | number>(0);

const sidebarComponent = shallowRef<any>(null);
sidebarComponent.value = activitybars.value[0].component;

function handleClick(item: ActivitybarModel, index: number) {
  if (activityBarCheckedIndex.value === index) {
    activityBarCheckedIndex.value = null;
    return false;
  }
  sidebarComponent.value = item.component;
  activityBarCheckedIndex.value = index;
}
</script>
<template>
  <div class="relative flex">
    <div class="nada-action-bar">
      <ul class="nada-actions-container">
        <li
          v-for="(item, index) in activitybars"
          :key="index"
          class="nada-action-item"
          :title="item.title"
          :class="{ checked: activityBarCheckedIndex === index }"
          @click="handleClick(item, index)"
        >
          <NadaIcon class="relative" :name="item.icon" />
          <div class="text-14px">
            {{ item.title }}
          </div>
        </li>
      </ul>
    </div>
    <div
      class="nada-left-sidebar"
      :class="{ hide: activityBarCheckedIndex === null }"
    >
      <div class="nada-sidebar-container">
        <component :is="sidebarComponent" />
      </div>
    </div>
  </div>
</template>
