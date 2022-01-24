import { Action, Module, Mutation, VuexModule } from '@/store/modules/vuex-module-decorators'

import { SourceCodeServiceUser } from '@/services/sourceCode/SourceCodeService'

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

export * from './composition'
export default SourceCodeUsers
