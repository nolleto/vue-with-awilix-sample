import { Action, Module, Mutation, VuexModule } from '@/store/modules/vuex-module-decorators'

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

export * from './composition'
export default Configs
