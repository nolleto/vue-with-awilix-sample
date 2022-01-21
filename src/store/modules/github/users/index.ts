import { Action, Module, Mutation, VuexModule } from '@/store/modules/vuex-module-decorators'

import { GithubServiceUser } from '@/services/github/GithubService'
import { RefTypes } from 'vuex-composition-helpers/dist/types/util'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

@Module({
  namespaced: true
})
class GithubUsers extends VuexModule {
  users: GithubServiceUser[] = []

  @Mutation
  setUsers(newUsers: GithubServiceUser[]): void {
    this.users = newUsers
  }

  @Action
  async search(term: string): Promise<void> {
    const { commit, rootState } = this.context
    const { githubService } = rootState.container.current
    const users = await githubService.searchUser(term)

    commit('setUsers', users)
  }
}

type GithubUsersState = Pick<GithubUsers, 'users'>
type GithubUsersActions = Pick<GithubUsers, 'search'>

type useGithubUsersReturn = {
  users: RefTypes<GithubUsersState>['users']
  searchUsersByTerm: GithubUsersActions['search']
}

export const useGithubUsers = (): useGithubUsersReturn => {
  const { useState, useActions } = createNamespacedHelpers('github/users')
  const { search: searchUsersByTerm } = useActions(['search']) as GithubUsersActions
  const { users } = useState(['users']) as RefTypes<GithubUsersState>

  return { searchUsersByTerm, users }
}

export default GithubUsers
