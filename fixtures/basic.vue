<template>
  <div class="component" />
</template>

<style scoped>
.component:deep(.icon)::v-deep {
  display: flex;
  color: v-bind(componentColor);
}
</style>
