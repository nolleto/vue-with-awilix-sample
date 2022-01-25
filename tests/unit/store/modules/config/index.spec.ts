import configs from '@/store/modules/configs'
import { storeCreator } from '@test/vuex'

describe('Configs', () => {
  const createStore = storeCreator({
    modules: {
      configs
    }
  })

  describe('Actions', () => {
    describe('.updateConfigs', () => {
      it('updates config values', () => {
        const store = createStore()

        expect(store.state.configs).toEqual({
          isPreviewMode: false
        })

        store.dispatch('configs/updateConfigs', { isPreviewMode: true })

        expect(store.state.configs).toEqual({
          isPreviewMode: true
        })
      })
    })
  })
})
