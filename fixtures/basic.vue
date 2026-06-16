<template>
  <div class="component" />
</template>

<style scoped>
.component:deep(.icon)::v-deep {
  display: flex;
  color: v-bind(componentColor);
}
</style>

<style lang="scss">
@use 'sass:string';

@function capitalize($string) {
  @return string.to-upper-case(string.slice($string, 1, 1)) + string.slice($string, 2);
}

@mixin componentStyle($background) {
  padding: 10px 20px;
  color: #ffffff;
  background-color: $background;
  border-radius: 5px;
}

.component__button {
  font-size: $font-size-base;

  @extend %placeholder-button;
  @include componentStyle($primary-color);
}
</style>
