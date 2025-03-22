<template>
  <span v-if="props.isActive">
    <icon-check-circle-fill class="success" />
    <span>是</span>
  </span>
  <span v-if="props.isActive === false">
    <icon-minus-circle-fill class="warning" />
    <span>否</span>
  </span>
</template>

<script setup lang="ts">
defineOptions({ name: 'GiCellBoolean' })

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
})

interface Props {
  isActive: false | true
}
</script>

<style scoped lang="scss"></style>
