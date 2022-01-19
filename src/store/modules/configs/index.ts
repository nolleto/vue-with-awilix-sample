import { Module, VuexModule } from '@/store/modules/vuex-module-decorators'

@Module({
  namespaced: true
})
class Configs extends VuexModule {
  isPreviewMode = false
}

export default Configs
