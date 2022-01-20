<template>
  <button
    class="button"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Button extends Vue {
}
</script>

<style scoped>
.button {
  padding: 8px 18px;
  background-color: #42b883;
  color: #fff;
  border-radius: 50vh;
  border: none;
  outline: none;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease 0s
}

.button:hover {
  background-color: #42b8838e;
}
</style>
