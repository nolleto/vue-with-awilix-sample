import sourceCodeInfo from '@/store/modules/sourceCode/info'
import { storeCreator } from '@test/vuex'

describe('SourceCodeInfo', () => {
  const sourceCodeService = {
    name: 'SourceCodeService Name'
  }

  const createStore = storeCreator({
    modules: {
      sourceCodeInfo,
      container: {
        state: {
          current: { sourceCodeService }
        }
      }
    }
  })

  describe('Actions', () => {
    describe('.updateSourceCodeService', () => {
      it('update state according to "sourceCodeService"', () => {
        const store = createStore()

        expect(store.state.sourceCodeInfo).toEqual({
          name: ''
        })

        store.dispatch('sourceCodeInfo/updateSourceCodeService')

        expect(store.state.sourceCodeInfo).toEqual({
          name: 'SourceCodeService Name'
        })
      })
    })
  })
})
