<template>
  <label>
    <h3>{{label}}</h3>

    <v-select
      label="login"
      :placeholder="placeholder"
      :filterable="false"
      :options="options"
      :value="value"
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
  </label>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import vSelect from 'vue-select'
import debounce from 'debounce'
import { SourceCodeServiceUser } from '@/services/sourceCode/SourceCodeService'
import { useSourceCodeUsers } from '@/store/modules/sourceCode/users'
import { useSourceCodeInfo } from '@/store/modules/sourceCode/info'

import 'vue-select/dist/vue-select.css'

@Component({
  components: { vSelect },
  setup () {
    const { searchUsersByTerm, users: options } = useSourceCodeUsers()
    const { name: serviceName } = useSourceCodeInfo()

    return { searchUsersByTerm, options, serviceName }
  }
})
export default class UserSelect extends Vue {
  @Prop(Object) readonly value!: SourceCodeServiceUser

  serviceName!: string
  options!: SourceCodeServiceUser[]
  searchUsersByTerm!: (term: string) => Promise<void>

  get label(): string {
    return `Select a ${this.serviceName} user:`
  }

  get placeholder(): string {
    return `Type a ${this.serviceName} user...`
  }

  onSearch = debounce(this.search, 350)

  async search (search: string, setLoading: (isLoading: boolean) => void): Promise<void> {
    if (search.trim()) {
      setLoading(true)
      try {
        await this.searchUsersByTerm(search)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
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
</style>
