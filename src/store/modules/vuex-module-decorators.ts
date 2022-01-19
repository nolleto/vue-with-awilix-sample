import { StoreData } from '@/store/Store'
import { VuexModule as VuexMod } from 'vuex-module-decorators'

class VuexModule extends VuexMod<unknown, StoreData> { }

export { Action, Module, Mutation, MutationAction, config, getModule } from 'vuex-module-decorators'
export { VuexModule }
