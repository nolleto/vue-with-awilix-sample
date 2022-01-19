<template>
  <div>
    <v-select
      label="login"
      :filterable="false"
      :options="options"
      v-model="selected"
      @search="onSearch"
    >
      <template v-slot:option="option">
        <div class="option-item">
          <img class="option-item__image" :src="option.avatarUrl" />
          {{ option.login }}
        </div>
      </template>
    </v-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import vSelect from 'vue-select'
import debounce from 'debounce'
import { GithubServiceUser } from '@/services/github/GithubService'
import { useGithubUsers } from '@/store/modules/github/users'

import 'vue-select/dist/vue-select.css'

@Component({
  components: { vSelect },
  setup () {
    const { searchUsersByTerm, users: options } = useGithubUsers()

    return { searchUsersByTerm, options }
  }
})
export default class GithubUserSelect extends Vue {
  selected: GithubServiceUser | null = null

  options!: GithubServiceUser[]
  searchUsersByTerm!: (term: string) => Promise<void>

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
