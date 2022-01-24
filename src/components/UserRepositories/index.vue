<template>
  <div>
    <h2>{{title}}</h2>
    <div v-if="!isLoading" class="user-repositories__list-container">
      <UserRepository
        v-for="repository in repositories"
        :key="repository.id"
        :repository="repository"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { SourceCodeServiceRepository, SourceCodeServiceUser } from '@/services/sourceCode/SourceCodeService'
import { useSourceCodeRepositories } from '@/store/modules/sourceCode/repositories'
import UserRepository from '@/components/UserRepository/index.vue'

@Component({
  components: { UserRepository },
  setup() {
    const { repositories, isLoading, getUserRepositories } = useSourceCodeRepositories()

    return { repositories, isLoading, getUserRepositories }
  }
})
export default class UserRepositories extends Vue {
  @Prop(Object) readonly user!: SourceCodeServiceUser

  repositories!: SourceCodeServiceRepository[]
  isLoading!: boolean
  getUserRepositories!: (user: SourceCodeServiceUser) => Promise<void>

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
