<template>
  <div>
    <h2>{{title}}</h2>
    <div v-if="!isLoading" class="gh-repositories__list-container">
      <GithubUserRepository
        v-for="repository in repositories"
        :key="repository.id"
        :repository="repository"
      />
    </div>
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

  get title(): string {
    const repositoriesCount = this.repositories.length
    const { login: userName } = this.user

    if (this.isLoading) {
      return `Loading ${userName} repositories...`
    }

    return `${userName} has ${repositoriesCount} repositories`
  }

  async loadUserRepositories(): Promise<void> {
    await this.getUserRepositories(this.user)
  }
}
</script>

<style scoped>
.gh-repositories__list-container {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 8px;
}

@media (min-width: 768px) {
  .gh-repositories__list-container {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 992px) {
  .gh-repositories__list-container {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
