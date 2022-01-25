import sourceCodeUsers from '@/store/modules/sourceCode/users'
import { storeCreator } from '@test/vuex'

const sleep = (timer: number) => new Promise(resolve => {
  setTimeout(resolve, timer)
})

describe('SourceCodeUsers', () => {
  const searchUserMock = jest.fn()
  const createStore = storeCreator({
    modules: {
      sourceCodeUsers,
      container: {
        state: {
          current: {
            sourceCodeService: {
              searchUser: searchUserMock
            }
          }
        }
      }
    }
  })

  const mockSearchUser = ({ success = true }: { success?: boolean } = {}) => {
    searchUserMock.mockImplementation(async () => {
      const users = ['user-1', 'user-2', 'user-3']
      await sleep(10)

      if (!success) {
        throw new Error()
      }

      return users
    })
  }

  beforeEach(() => {
    searchUserMock.mockClear()
  })

  describe('Actions', () => {
    describe('.search', () => {
      beforeAll(() => {
        mockSearchUser()
      })

      it('calls sourceCodeService.searchUser', () => {
        const store = createStore()

        store.dispatch('sourceCodeUsers/search', 'term')

        expect(searchUserMock).toBeCalledWith('term')
      })

      describe('When fulfilled', () => {
        beforeEach(() => {
          mockSearchUser({ success: true })
        })

        it('updates to success state', async () => {
          const store = createStore()

          await store.dispatch('sourceCodeUsers/search', 'term')

          expect(store.state.sourceCodeUsers).toEqual({
            users: ['user-1', 'user-2', 'user-3']
          })
        })
      })
    })
  })
})
