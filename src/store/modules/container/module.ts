import { Action, Module, Mutation, VuexModule } from '@/store/modules/vuex-module-decorators'
import createContainer, { ContainerType } from './createContainer'

@Module({
  namespaced: true
})
class Container extends VuexModule {
  current!: ContainerType['cradle']

  @Mutation
  setContainer(newContainerCradle: ContainerType['cradle']): void {
    this.current = newContainerCradle
  }

  @Action
  updateContainer(): void {
    const { commit, rootState } = this.context
    const { isPreviewMode } = rootState.configs
    const newContainer = createContainer({ isPreviewMode })

    commit('setContainer', { ...newContainer.cradle })
  }
}

export default Container
