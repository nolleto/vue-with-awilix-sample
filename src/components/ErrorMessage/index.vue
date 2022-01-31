<template>
  <p class="error-message">
    <slot />
  </p>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ErrorMessage extends Vue {
}
</script>

<style scoped>

.error-message {
  color: #E74C3C;
}
</style>
