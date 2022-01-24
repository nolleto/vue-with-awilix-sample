import { Action, Module, Mutation, VuexModule } from '@/store/modules/vuex-module-decorators'
import { SourceCodeServiceRepository, SourceCodeServiceUser } from '@/services/sourceCode/SourceCodeService'

import { RefTypes } from 'vuex-composition-helpers/dist/types/util'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

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

type SourceCodeRepositoriesState = Pick<SourceCodeRepositories, 'repositories' | 'status'>
type SourceCodeRepositoriesGetters = Pick<SourceCodeRepositories, 'isLoading'>
type SourceCodeRepositoriesActions = Pick<SourceCodeRepositories, 'getUserRepositories'>

type useSourceCodeRepositoriesReturn = {
  repositories: RefTypes<SourceCodeRepositoriesState>['repositories']
  isLoading: RefTypes<SourceCodeRepositoriesGetters>['isLoading']
  getUserRepositories: SourceCodeRepositoriesActions['getUserRepositories']
}

export const useSourceCodeRepositories = (): useSourceCodeRepositoriesReturn => {
  const { useState, useGetters, useActions } = createNamespacedHelpers('sourceCode/repositories')
  const { getUserRepositories } = useActions(['getUserRepositories']) as SourceCodeRepositoriesActions
  const { repositories } = useState(['repositories']) as RefTypes<SourceCodeRepositoriesState>
  const { isLoading } = useGetters(['isLoading']) as RefTypes<SourceCodeRepositoriesGetters>

  return { getUserRepositories, repositories, isLoading }
}

export default SourceCodeRepositories
