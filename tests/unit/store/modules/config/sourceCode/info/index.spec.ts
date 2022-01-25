import container from '@/store/modules/container'
import sourceCodeInfo from '@/store/modules/sourceCode/info'
import sourceCodeInfoPlugin from '@/store/plugins/sourceCode/info/index'
import { storeCreator } from '@test/vuex'

describe('ContainerPlugin', () => {
  const updateSourceCodeServiceMock = jest.fn()
  const createStore = storeCreator({
    modules: {
      sourceCode: {
        namespaced: true,
        modules: {
          info: {
            ...sourceCodeInfo,
            actions: {
              ...sourceCodeInfo.actions,
              updateSourceCodeService: updateSourceCodeServiceMock
            }
          }
        }
      },
      container: {
        ...container,
        mutations: {
          ...container.mutations,
          anotherMutation: jest.fn()
        }
      }
    },
    plugins: [sourceCodeInfoPlugin]
  })

  beforeEach(() => {
    updateSourceCodeServiceMock.mockClear()
  })

  describe('When mutation "container/setContainer" is called', () => {
    it('dispatches "sourceCode/info/updateSourceCodeService"', () => {
      const store = createStore()

      store.commit('container/setContainer', {})

      expect(updateSourceCodeServiceMock).toBeCalledTimes(1)
    })
  })

  describe('When other mutation than "container/setContainer" is called', () => {
    it('does not dispatch "sourceCode/info/updateSourceCodeService"', () => {
      const store = createStore()

      store.commit('container/anotherMutation', {})

      expect(updateSourceCodeServiceMock).not.toBeCalled()
    })
  })
})
