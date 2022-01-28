<template>
  <label>
    <h3>{{label}}</h3>

    <v-select
      label="login"
      :placeholder="placeholder"
      :filterable="false"
      :options="options"
      :value="value"
      :loading="isLoading"
      @search="onSearch"
      @input="handleInput"
    >
      <template v-slot:option="option">
        <div class="option-item">
          <img class="option-item__image" :src="option.avatarUrl" />
          {{ option.login }}
        </div>
      </template>
    </v-select>
    <p class="option-item__error" v-if="hasError">{{errorMessage}}</p>
  </label>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import vSelect from 'vue-select'
import debounce from 'debounce'
import { SourceCodeServiceUser } from '@/services/sourceCode/SourceCodeService'
import { useSourceCodeUsers, useSourceCodeUsersReturn } from '@/store/modules/sourceCode/users'
import { useSourceCodeInfo } from '@/store/modules/sourceCode/info'

import 'vue-select/dist/vue-select.css'

@Component({
  components: { vSelect },
  setup () {
    const {
      searchUsersByTerm,
      users: options,
      errorMessage,
      hasError,
      isLoading
    } = useSourceCodeUsers()
    const { name: serviceName } = useSourceCodeInfo()

    return {
      searchUsersByTerm,
      options,
      serviceName,
      errorMessage,
      hasError,
      isLoading
    }
  }
})
export default class UserSelect extends Vue {
  @Prop(Object) readonly value!: SourceCodeServiceUser

  serviceName!: string
  options!: useSourceCodeUsersReturn['users']
  searchUsersByTerm!: useSourceCodeUsersReturn['searchUsersByTerm']
  hasError!: useSourceCodeUsersReturn['hasError']
  isLoading!: useSourceCodeUsersReturn['isLoading']
  errorMessage!: useSourceCodeUsersReturn['errorMessage']

  get label(): string {
    return `Select a ${this.serviceName} user:`
  }

  get placeholder(): string {
    return `Type a ${this.serviceName} user...`
  }

  onSearch = debounce(this.search, 350)

  async search(search: string): Promise<void> {
    if (search.trim()) {
      this.searchUsersByTerm(search)
    }
  }

  handleInput(valueSelected: SourceCodeServiceUser | null): void {
    this.$emit('input', { ...valueSelected })
  }
}
</script>

<style scoped>
.option-item {
  display: flex;
  align-items: center;
  align-content: center;
  gap: 8px;
}

.option-item__image {
  width: 30px;
  height: 30px;
}

.option-item__error {
  color: #E74C3C;
}
</style>
