import { Action, Module, Mutation, VuexModule } from '@/store/modules/vuex-module-decorators'

import { SourceCodeServiceUser } from '@/services/sourceCode/SourceCodeService'

type Status = 'idle' | 'loading' | 'success' | 'error'

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }

  return 'Unknown error'
}

@Module({
  namespaced: true
})
class SourceCodeUsers extends VuexModule {
  users: SourceCodeServiceUser[] = []
  status: Status = 'idle'
  errorMessage: string | null = null

  get hasError(): boolean {
    return Boolean(this.errorMessage)
  }

  get isLoading(): boolean {
    return this.status === 'loading'
  }

  @Mutation
  setPending(): void {
    this.users = []
    this.errorMessage = null
    this.status = 'loading'
  }

  @Mutation
  setFulfilled(newUsers: SourceCodeServiceUser[]): void {
    this.users = newUsers
    this.status = 'success'
  }

  @Mutation
  setError(errorMessage: string): void {
    this.errorMessage = errorMessage
    this.status = 'error'
  }

  @Action
  async search(term: string): Promise<void> {
    const { commit, rootState } = this.context
    const { sourceCodeService } = rootState.container.current

    commit('setPending')

    try {
      const users = await sourceCodeService.searchUser(term)

      commit('setFulfilled', users)
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error)

      commit('setError', errorMessage)
    }
  }
}

export * from './composition'
export default SourceCodeUsers
