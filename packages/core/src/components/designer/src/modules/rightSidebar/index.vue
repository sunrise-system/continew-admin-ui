<script lang="ts" setup>
import type { RightSidebarModel } from '@nada-designer/types';

import { computed, ref, shallowRef } from 'vue';

import { NadaIcon } from '@nada-designer/base-ui';
import { pluginManager } from '@nada-designer/utils';

import EpicBreadcrumb from './breadcrumb.vue';

const hideRightMain = ref(false);

const rightSidebars = computed(() => {
  return pluginManager.getRightSidebars.value
    .filter((item) => item.visible)
    .sort((a, b) => {
      return a.sort! - b.sort!;
    });
});

const activityBarCheckedIndex = ref<null | number>(0);
const sidebarComponent = shallowRef<any>(null);
sidebarComponent.value = rightSidebars.value[0]?.component;

function handleHideRight() {
  hideRightMain.value = !hideRightMain.value;
}

function handleClick(item: RightSidebarModel, index: number) {
  if (activityBarCheckedIndex.value === index) {
    return false;
  }
  sidebarComponent.value = item.component;
  activityBarCheckedIndex.value = index;
}
</script>
<template>
  <div v-if="sidebarComponent" class="nada-right-sidebar-container relative">
    <!-- 折叠按钮 start -->
    <div
      class="nada-right-sidebar-hide-btn left--18px top-80px w-28px h-28px z-9 absolute flex cursor-pointer items-center justify-center rounded-full"
      @click="handleHideRight"
    >
      <NadaIcon
        class="transition-all"
        :class="{ 'rotate-180': hideRightMain }"
        name="icon--nada--arrow-forward-ios-rounded"
      />
    </div>
    <div class="w-10px"></div>
    <!-- 折叠按钮 end -->

    <div class="nada-right-sidebar w-308px" :class="{ hide: hideRightMain }">
      <div class="w-308px">
        <EpicBreadcrumb />
        <ul class="nada-actions-container">
          <li
            v-for="(item, index) in rightSidebars"
            :key="index"
            class="nada-action-item"
            :title="item.title"
            :class="{ checked: activityBarCheckedIndex === index }"
            @click="handleClick(item, index)"
          >
            {{ item.title }}
          </li>
        </ul>
        <div class="nada-sidebar-content">
          <component :is="sidebarComponent" />
        </div>
      </div>
    </div>
  </div>
</template>
