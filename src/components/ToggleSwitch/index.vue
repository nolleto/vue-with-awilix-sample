<template>
  <label class="switch-container">
    {{label}}
    <div class="switch">
      <input
        type="checkbox"
        :checked="value"
        @change="handleChange($event.target.checked)"
      />
      <span class="slider round"></span>
    </div>
  </label>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class ToggleSwitch extends Vue {
  @Prop(Boolean) readonly value!: boolean
  @Prop(String) readonly label?: string

  handleChange(checked: boolean): void {
    this.$emit('input', checked)
  }
}
</script>

<style scoped>
.switch-container{
  cursor: pointer;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #42b883;
}

input:focus + .slider {
  box-shadow: 0 0 1px #42b883;
}

input:checked + .slider:before {
  -webkit-transform: translateX(16px);
  -ms-transform: translateX(16px);
  transform: translateX(16px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
