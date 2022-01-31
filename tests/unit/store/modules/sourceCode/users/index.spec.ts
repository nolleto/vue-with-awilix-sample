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
        throw new Error('Error message')
      }

      return users
    })
  }

  beforeEach(() => {
    searchUserMock.mockClear()
  })

  describe('Getters', () => {
    describe('.isLoading', () => {
      describe('When "status" is "loading"', () => {
        it('returns true', () => {
          const store = createStore()

          store.state.sourceCodeUsers.status = 'loading'

          expect(store.getters['sourceCodeUsers/isLoading']).toBeTruthy()
        })
      })

      describe('When "status" is not "loading"', () => {
        it('returns false', () => {
          const store = createStore()

          store.state.sourceCodeUsers.status = 'error'

          expect(store.getters['sourceCodeUsers/isLoading']).toBeFalsy()
        })
      })
    })

    describe('.hasError', () => {
      describe('When "errorMessage" is null or empty', () => {
        it('returns false', () => {
          const store = createStore()

          store.state.sourceCodeUsers.errorMessage = null

          expect(store.getters['sourceCodeUsers/hasError']).toBeFalsy()
        })
      })

      describe('When "errorMessage" is not empty', () => {
        it('returns true', () => {
          const store = createStore()

          store.state.sourceCodeUsers.errorMessage = 'error'

          expect(store.getters['sourceCodeUsers/hasError']).toBeTruthy()
        })
      })
    })
  })

  describe('Actions', () => {
    describe('.search', () => {
      beforeAll(() => {
        mockSearchUser()
      })

      it('updates to loading state', async () => {
        const store = createStore()

        store.dispatch('sourceCodeUsers/search', 'term')

        expect(store.state.sourceCodeUsers).toEqual({
          users: [],
          status: 'loading',
          errorMessage: null
        })
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
            users: ['user-1', 'user-2', 'user-3'],
            status: 'success',
            errorMessage: null
          })
        })
      })

      describe('When throw a error', () => {
        beforeEach(() => {
          mockSearchUser({ success: false })
        })

        it('updates to success state', async () => {
          const store = createStore()

          await store.dispatch('sourceCodeUsers/search', 'term')

          expect(store.state.sourceCodeUsers).toEqual({
            users: [],
            status: 'error',
            errorMessage: 'Error message'
          })
        })
      })
    })
  })
})
