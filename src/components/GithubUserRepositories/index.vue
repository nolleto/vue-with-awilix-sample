<template>
  <div>
    GithubUserRepositories
    <p v-if="isLoading">Loading {{user.login}} repositories...</p>
    <template v-else>
      <GithubUserRepository
        v-for="repository in repositories"
        :key="repository.id"
        :repository="repository"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { GithubServiceRepository, GithubServiceUser } from '@/services/github/GithubService'
import { useGithubRepositories } from '@/store/modules/github/repositories'
import GithubUserRepository from '@/components/GithubUserRepository/index.vue'

@Component({
  components: { GithubUserRepository },
  setup() {
    const { repositories, isLoading, getUserRepositories } = useGithubRepositories()

    return { repositories, isLoading, getUserRepositories }
  }
})
export default class GithubUserRepositories extends Vue {
  @Prop(Object) readonly user!: GithubServiceUser

  repositories!: GithubServiceRepository[]
  isLoading!: boolean
  getUserRepositories!: (user: GithubServiceUser) => Promise<void>

  mounted(): void {
    this.loadUserRepositories()
  }

  async loadUserRepositories(): Promise<void> {
    await this.getUserRepositories(this.user)
  }
}
</script>
