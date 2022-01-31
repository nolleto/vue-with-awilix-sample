<template>
  <div>
    <button @click="loadUserRepositories">refresh</button>
    <template v-if="!hasError">
      <h2 data-testid="user-repositories-title">{{title}}</h2>
      <div
        v-if="!isLoading"
        class="user-repositories__list-container"
        data-testid="user-repositories-container"
      >
        <UserRepository
          v-for="repository in repositories"
          :key="repository.id"
          :repository="repository"
        />
      </div>
    </template>

    <ErrorMessage v-else data-testid="user-repositories-error">
      {{errorMessage}}
    </ErrorMessage>
  </div>
</template>

<script setup lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { SourceCodeServiceUser } from '@/services/sourceCode/SourceCodeService'
import { useSourceCodeRepositories, useSourceCodeRepositoriesReturn } from '@/store/modules/sourceCode/repositories'
import UserRepository from '@/components/UserRepository/index.vue'
import ErrorMessage from '@/components/ErrorMessage/index.vue'

@Component({
  components: {
    UserRepository,
    ErrorMessage
  },
  setup() {
    const {
      repositories,
      isLoading,
      getUserRepositories,
      hasError,
      errorMessage
    } = useSourceCodeRepositories()

    return { repositories, isLoading, getUserRepositories, hasError, errorMessage }
  }
})
export default class UserRepositories extends Vue {
  @Prop(Object) readonly user!: SourceCodeServiceUser

  repositories!: useSourceCodeRepositoriesReturn['repositories']['value']
  isLoading!: useSourceCodeRepositoriesReturn['isLoading']['value']
  hasError!: useSourceCodeRepositoriesReturn['hasError']['value']
  errorMessage!: useSourceCodeRepositoriesReturn['errorMessage']['value']
  getUserRepositories!: useSourceCodeRepositoriesReturn['getUserRepositories']

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
.user-repositories__list-container {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 8px;
}

@media (min-width: 768px) {
  .user-repositories__list-container {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 992px) {
  .user-repositories__list-container {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
