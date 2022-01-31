import { Action, Module, Mutation, VuexModule } from '@/store/modules/vuex-module-decorators'
import { SourceCodeServiceRepository, SourceCodeServiceUser } from '@/services/sourceCode/SourceCodeService'

import { getErrorMessage } from '@/selectors/error'

type Status = 'idle' | 'loading' | 'success' | 'error'

@Module({
  namespaced: true
})
class SourceCodeRepositories extends VuexModule {
  repositories: SourceCodeServiceRepository[] = []
  status: Status = 'idle'
  errorMessage: string | null = null

  get isLoading(): boolean {
    return this.status === 'loading'
  }

  get hasError(): boolean {
    return Boolean(this.errorMessage)
  }

  @Mutation
  setPending(): void {
    this.status = 'loading'
    this.repositories = []
  }

  @Mutation
  setFulfilled(repositories: SourceCodeServiceRepository[]): void {
    this.status = 'success'
    this.repositories = repositories
  }

  @Mutation
  setError(errorMessage: string): void {
    this.status = 'error'
    this.errorMessage = errorMessage
  }

  @Action
  async getUserRepositories(user: SourceCodeServiceUser): Promise<void> {
    const { commit, rootState } = this.context
    const { sourceCodeService } = rootState.container.current

    try {
      commit('setPending')

      const repositories = await sourceCodeService.getUserRepositories(user.login)

      commit('setFulfilled', repositories)
    } catch (error) {
      const errorMessage = getErrorMessage(error)

      commit('setError', errorMessage)
    }
  }
}

export * from './composition'
export default SourceCodeRepositories
