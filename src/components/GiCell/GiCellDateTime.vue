<template>
  <span v-if="props.value > 0">
    <span>{{ value }}</span>
  </span>
</template>

<script setup lang="ts">
defineOptions({ name: 'GiCellDateTime' })

const props = withDefaults(defineProps<Props>(), {
  value: 0,
})

interface Props {
  value: any
}
</script>

<style scoped lang="scss"></style>
