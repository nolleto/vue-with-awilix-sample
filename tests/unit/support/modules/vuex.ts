import Vuex, { ModuleTree, Store, StoreOptions } from 'vuex'

import Vue from 'vue'
import cloneDeep from 'lodash.clonedeep'

Vue.use(Vuex)

const cloneModules = <T>(options: StoreOptions<T>): ModuleTree<T> | undefined => {
  if (options.modules) {
    const originalModules = options.modules

    return Object.keys(originalModules).reduce(
      (acc, moduleName) => {
        const originalModule = originalModules[moduleName]

        return {
          ...acc,
          [moduleName]: cloneDeep(originalModule)
        }
      },
      {}
    )
  }
}

export const storeCreator = <T>(options: StoreOptions<T>) => (): Store<T> => {
  return new Vuex.Store({
    ...options,
    modules: cloneModules(options)
  })
}
