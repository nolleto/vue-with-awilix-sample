<template>
  <div class="icon-container">
    <v-icon :name="name"/>
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import VueIcon from 'vue-awesome/components/Icon'

import 'vue-awesome/icons'

@Component({
  components: { 'v-icon': VueIcon }
})
export default class Icon extends Vue {
  @Prop(String) readonly name!: string
}
</script>

<style scoped>
.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
</style>
