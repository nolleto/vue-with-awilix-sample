<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <GithubUserSelect v-model="userSelected"/>

    <GithubUserRepositories
      v-if="showRepositories"
      :user="userSelected"
      :key="userSelected.id"
    />
    <p v-else>Select a user</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import GithubUserSelect from '@/components/GithubUserSelect/index.vue'
import GithubUserRepositories from '@/components/GithubUserRepositories/index.vue'
import { GithubServiceUser } from '@/services/github/GithubService'

@Component({
  components: {
    GithubUserSelect,
    GithubUserRepositories
  }
})
export default class Home extends Vue {
  userSelected: GithubServiceUser | null = null

  get showRepositories(): boolean {
    return Boolean(this.userSelected?.id)
  }
}
</script>
