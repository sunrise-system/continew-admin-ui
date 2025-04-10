<script lang="ts" setup>
import { computed, inject, onMounted, ref } from 'vue';

import { PageSchema } from '@nada-designer/types';

import nadaEditScreenContainer from './editScreenContainer.vue';
import nadaNodeItem from './nodeItem.vue';
import nadaPreviewWidgets from './previewWidgets.vue';

const nadaEditRangeRef = ref<HTMLDivElement | null>(null);
const nadaPreviewWidgetsRef = ref<null | typeof nadaPreviewWidgets>(null);

const pageSchema = inject('pageSchema') as PageSchema;
const rootSchema = computed(() => {
  return pageSchema.schemas[0];
});

const getEditRangestyle = computed(() => {
  return {
    height: '100%',
    width: '100%',
  };
});

onMounted(() => {
  nadaPreviewWidgetsRef.value?.handleInit(nadaEditRangeRef.value);
});
</script>
<template>
  <section class="nada-edit-canvas">
    <nadaEditScreenContainer>
      <div
        ref="nadaEditRangeRef"
        class="nada-edit-range relative overflow-auto rounded-md"
        :style="getEditRangestyle"
      >
        <nadaNodeItem :schema="rootSchema" />
        <nadaPreviewWidgets ref="nadaPreviewWidgetsRef" />
      </div>
    </nadaEditScreenContainer>
  </section>
</template>
