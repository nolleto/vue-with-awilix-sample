import configs from '@/store/modules/configs'
import container from '@/store/modules/container'
import containerPlugin from '@/store/plugins/container'
import { storeCreator } from '@test/vuex'

describe('ContainerPlugin', () => {
  const updateContainerMock = jest.fn()
  const createStore = storeCreator({
    modules: {
      configs: {
        ...configs,
        mutations: {
          ...configs.mutations,
          anotherMutation: jest.fn()
        }
      },
      container: {
        ...container,
        actions: {
          ...container.actions,
          updateContainer: updateContainerMock
        }
      }
    },
    plugins: [containerPlugin]
  })

  beforeEach(() => {
    updateContainerMock.mockClear()
  })

  it('dispatches "container/updateContainer"', () => {
    createStore()

    expect(updateContainerMock).toBeCalledTimes(1)
  })

  describe('When mutation "configs/setConfigs" is called', () => {
    it('dispatches "container/updateContainer"', () => {
      const store = createStore()

      store.commit('configs/setConfigs', {})

      expect(updateContainerMock).toBeCalledTimes(2)
    })
  })

  describe('When other mutation than "configs/setConfigs" is called', () => {
    it('does not dispatch "container/updateContainer"', () => {
      const store = createStore()

      store.commit('configs/anotherMutation', {})

      expect(updateContainerMock).toBeCalledTimes(1)
    })
  })
})
