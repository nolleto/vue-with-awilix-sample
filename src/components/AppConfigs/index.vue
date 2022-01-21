<template>
  <div>
    Preview Mode
    <toggle-switch
      :value="isPreviewMode"
      @input="handlePreviewModeChange"
    />
  </div>
</template>

<script lang="ts">
import { useConfigs, useConfigsReturn } from '@/store/modules/configs'
import { Component, Vue } from 'vue-property-decorator'
import ToggleSwitch from '@/components/ToggleSwitch/index.vue'

@Component({
  components: { ToggleSwitch },
  setup() {
    const { updateConfigs, isPreviewMode } = useConfigs()

    return { updateConfigs, isPreviewMode }
  }
})
export default class AppConfigs extends Vue {
  isPreviewMode!: boolean
  updateConfigs!: useConfigsReturn['updateConfigs']

  handlePreviewModeChange(newValue : boolean): void {
    this.updateConfigs({ isPreviewMode: newValue })
  }
}
</script>
