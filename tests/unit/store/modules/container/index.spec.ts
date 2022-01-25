import container from '@/store/modules/container'
import createContainer from '@/store/modules/container/createContainer'
import { storeCreator } from '@test/vuex'

jest.mock('@/store/modules/container/createContainer', () => jest.fn(() => ({
  cradle: { someService: 'Some Service' }
})))

describe('Container', () => {
  const createStore = storeCreator({
    modules: {
      container,
      configs: {
        state: {
          isPreviewMode: false
        }
      }
    }
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Actions', () => {
    describe('.updateContainer', () => {
      it('calls createContainer with configs', () => {
        const store = createStore()

        store.dispatch('container/updateContainer')

        expect(createContainer).toBeCalledWith({
          isPreviewMode: false
        })
      })

      it('updates current container', () => {
        const store = createStore()

        expect(store.state.container.current).toBeUndefined()

        store.dispatch('container/updateContainer')

        expect(store.state.container.current).toEqual({ someService: 'Some Service' })
      })
    })
  })
})
