import { Action, Module, Mutation, VuexModule } from '@/store/modules/vuex-module-decorators'
import { SourceCodeServiceRepository, SourceCodeServiceUser } from '@/services/sourceCode/SourceCodeService'

type Status = 'idle' | 'loading' | 'success' | 'error'

@Module({
  namespaced: true
})
class SourceCodeRepositories extends VuexModule {
  repositories: SourceCodeServiceRepository[] = []
  status: Status = 'idle'

  get isLoading(): boolean {
    return this.status === 'loading'
  }

  @Mutation
  setPending(): void {
    this.status = 'loading'
  }

  @Mutation
  setFulfilled(repositories: SourceCodeServiceRepository[]): void {
    this.status = 'success'
    this.repositories = repositories
  }

  @Mutation
  setError(): void {
    this.status = 'error'
  }

  @Action
  async getUserRepositories(user: SourceCodeServiceUser): Promise<void> {
    const { commit, rootState } = this.context
    const { sourceCodeService } = rootState.container.current

    try {
      commit('setPending')

      const repositories = await sourceCodeService.getUserRepositories(user.login)

      commit('setFulfilled', repositories)
    } catch {
      commit('setError')
    }
  }
}

export * from './composition'
export default SourceCodeRepositories
