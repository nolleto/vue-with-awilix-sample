import { Action, Module, Mutation, VuexModule } from '@/store/modules/vuex-module-decorators'
import { GithubServiceRepository, GithubServiceUser } from '@/services/github/GithubService'

import { RefTypes } from 'vuex-composition-helpers/dist/types/util'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

type Status = 'idle' | 'loading' | 'success' | 'error'

@Module({
  namespaced: true
})
class GithubRepositories extends VuexModule {
  repositories: GithubServiceRepository[] = []
  status: Status = 'idle'

  get isLoading(): boolean {
    return this.status === 'loading'
  }

  @Mutation
  setPending(): void {
    this.status = 'loading'
  }

  @Mutation
  setFulfilled(repositories: GithubServiceRepository[]): void {
    this.status = 'success'
    this.repositories = repositories
  }

  @Mutation
  setError(): void {
    this.status = 'error'
  }

  @Action
  async getUserRepositories(user: GithubServiceUser): Promise<void> {
    const { commit, rootState } = this.context
    const { githubService } = rootState.container.current

    try {
      commit('setPending')

      const repositories = await githubService.getUserRepositories(user.login)

      commit('setFulfilled', repositories)
    } catch {
      commit('setError')
    }
  }
}

type GithubRepositoriesState = Pick<GithubRepositories, 'repositories' | 'status'>
type GithubRepositoriesGetters = Pick<GithubRepositories, 'isLoading'>
type GithubRepositoriesActions = Pick<GithubRepositories, 'getUserRepositories'>

type useGithubRepositoriesReturn = {
  repositories: RefTypes<GithubRepositoriesState>['repositories']
  isLoading: RefTypes<GithubRepositoriesGetters>['isLoading']
  getUserRepositories: GithubRepositoriesActions['getUserRepositories']
}

export const useGithubRepositories = (): useGithubRepositoriesReturn => {
  const { useState, useGetters, useActions } = createNamespacedHelpers('github/repositories')
  const { getUserRepositories } = useActions(['getUserRepositories']) as GithubRepositoriesActions
  const { repositories } = useState(['repositories']) as RefTypes<GithubRepositoriesState>
  const { isLoading } = useGetters(['isLoading']) as RefTypes<GithubRepositoriesGetters>

  return { getUserRepositories, repositories, isLoading }
}

export default GithubRepositories
