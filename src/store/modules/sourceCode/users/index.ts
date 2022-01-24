import { Action, Module, Mutation, VuexModule } from '@/store/modules/vuex-module-decorators'

import { RefTypes } from 'vuex-composition-helpers/dist/types/util'
import { SourceCodeServiceUser } from '@/services/sourceCode/SourceCodeService'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

@Module({
  namespaced: true
})
class SourceCodeUsers extends VuexModule {
  users: SourceCodeServiceUser[] = []

  @Mutation
  setUsers(newUsers: SourceCodeServiceUser[]): void {
    this.users = newUsers
  }

  @Action
  async search(term: string): Promise<void> {
    const { commit, rootState } = this.context
    const { sourceCodeService } = rootState.container.current
    const users = await sourceCodeService.searchUser(term)

    commit('setUsers', users)
  }
}

type SourceCodeUsersState = Pick<SourceCodeUsers, 'users'>
type SourceCodeUsersActions = Pick<SourceCodeUsers, 'search'>

type useSourceCodeUsersReturn = {
  users: RefTypes<SourceCodeUsersState>['users']
  searchUsersByTerm: SourceCodeUsersActions['search']
}

export const useSourceCodeUsers = (): useSourceCodeUsersReturn => {
  const { useState, useActions } = createNamespacedHelpers('sourceCode/users')
  const { search: searchUsersByTerm } = useActions(['search']) as SourceCodeUsersActions
  const { users } = useState(['users']) as RefTypes<SourceCodeUsersState>

  return { searchUsersByTerm, users }
}

export default SourceCodeUsers
