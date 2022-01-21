import { Action, Module, Mutation, VuexModule } from '@/store/modules/vuex-module-decorators'

import { RefTypes } from 'vuex-composition-helpers/dist/types/util'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

type AppConfigs = {
  isPreviewMode: boolean
}
@Module({
  namespaced: true
})
class Configs extends VuexModule {
  isPreviewMode = false

  @Mutation
  setConfigs(newConfigs: AppConfigs): void {
    this.isPreviewMode = newConfigs.isPreviewMode
  }

  @Action
  updateConfigs(newConfigs: AppConfigs): void {
    const { commit } = this.context

    commit('setConfigs', newConfigs)
  }
}

type ConfigsState = Pick<Configs, 'isPreviewMode'>
type ConfigsActions = Pick<Configs, 'updateConfigs'>

type useConfigsReturn = {
  isPreviewMode: RefTypes<ConfigsState>['isPreviewMode']
  updateConfigs: ConfigsActions['updateConfigs']
}

const useConfigs = (): useConfigsReturn => {
  const { useState, useActions } = createNamespacedHelpers('configs')
  const { updateConfigs } = useActions(['updateConfigs']) as ConfigsActions
  const { isPreviewMode } = useState(['isPreviewMode']) as RefTypes<ConfigsState>

  return { updateConfigs, isPreviewMode }
}

export {
  useConfigs,
  useConfigsReturn
}
export default Configs
