import { Action, Module, Mutation, VuexModule } from '@/store/modules/vuex-module-decorators'

import { RefTypes } from 'vuex-composition-helpers/dist/types/util'
import { SourceCodeService } from '@/services/sourceCode/SourceCodeService'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

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

type SourceCodeInfoState = Pick<SourceCodeInfo, 'name'>

type useSourceCodeInfoReturn = {
  name: RefTypes<SourceCodeInfoState>['name']
}

export const useSourceCodeInfo = (): useSourceCodeInfoReturn => {
  const { useState } = createNamespacedHelpers('sourceCode/info')
  const { name } = useState(['name']) as RefTypes<SourceCodeInfoState>

  return { name }
}

export default SourceCodeInfo
