<template>
  <span v-if="!dictItem"></span>
  <span v-else-if="!dictItem.extra">{{ dictItem.name }}</span>
  <a-tag v-else-if="dictItem.extra === 'primary'" color="arcoblue">{{ dictItem.name }}</a-tag>
  <a-tag v-else-if="dictItem.extra === 'success'" color="green">{{ dictItem.name }}</a-tag>
  <a-tag v-else-if="dictItem.extra === 'warning'" color="orangered">{{ dictItem.name }}</a-tag>
  <a-tag v-else-if="dictItem.extra === 'error'" color="red">{{ dictItem.name }}</a-tag>
  <a-tag v-else-if="dictItem.extra === 'default'" color="gray">{{ dictItem.name }}</a-tag>
  <a-tag v-else :color="dictItem.extra">{{ dictItem.name }}</a-tag>
</template>

<script setup lang="ts">
import type { NameCodeState } from '@/types/global'
import type { GiCellTagType } from '@/components/GiCell/type'

defineOptions({ name: 'GiCellTag' })
const props = withDefaults(defineProps<Partial<GiCellTagType>>(), {
  option: [{
    name: '',
    code: '',
  }],
  value: '',
})

const dictItem = computed((): NameCodeState => {
  try {
    return props.option.find(
      (d) => d.code === String(props.value),
    ) || { name: '', code: '' }
  } catch (error) {
    return { name: '', code: '' }
  }
})
</script>

<style scoped lang="scss"></style>
