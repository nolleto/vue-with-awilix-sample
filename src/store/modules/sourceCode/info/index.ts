import { Action, Module, Mutation, VuexModule } from '@/store/modules/vuex-module-decorators'

import { SourceCodeService } from '@/services/sourceCode/SourceCodeService'

@Module({
  namespaced: true
})
class SourceCodeInfo extends VuexModule {
  name = ''

  @Mutation
  setSourceCodeService(sourceCodeService: SourceCodeService): void {
    this.name = sourceCodeService.name
  }

  @Action
  updateSourceCodeService(): void {
    const { commit, rootState } = this.context
    const { sourceCodeService } = rootState.container.current

    commit('setSourceCodeService', sourceCodeService)
  }
}

export * from './composition'
export default SourceCodeInfo
