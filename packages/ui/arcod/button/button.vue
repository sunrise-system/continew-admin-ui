<script lang="ts" setup>
import type { ComponentSchema } from '@nada-designer/types';

import type { PropType } from 'vue';

import { Button } from '@arco-design/web-vue';

const props = defineProps({
  componentSchema: {
    default: () => ({}),
    type: Object as PropType<ComponentSchema>,
  },
});
</script>
<template>
  <Button v-bind="props.componentSchema?.componentProps">
    <slot>{{ props.componentSchema?.label }}</slot>
  </Button>
</template>
