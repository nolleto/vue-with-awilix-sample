import sourceCodeRepositories from '@/store/modules/sourceCode/repositories'
import { storeCreator } from '@test/vuex'

const sleep = (timer: number) => new Promise(resolve => {
  setTimeout(resolve, timer)
})

describe('SourceCodeRepositories', () => {
  const getUserRepositoriesMocked = jest.fn()
  const createStore = storeCreator({
    modules: {
      sourceCodeRepositories,
      container: {
        state: {
          current: {
            sourceCodeService: {
              getUserRepositories: getUserRepositoriesMocked
            }
          }
        }
      }
    }
  })

  const mockGetUserRepositories = ({ success = true }: { success?: boolean } = {}) => {
    getUserRepositoriesMocked.mockImplementation(async () => {
      const repositories = ['repo-1', 'repo-2', 'repo-3']
      await sleep(10)

      if (!success) {
        throw new Error()
      }

      return repositories
    })
  }

  beforeEach(() => {
    getUserRepositoriesMocked.mockClear()
  })

  describe('Getters', () => {
    describe('.isLoading', () => {
      describe('When "status" is "loading"', () => {
        it('returns true', () => {
          const store = createStore()

          store.state.sourceCodeRepositories.status = 'loading'

          expect(store.getters['sourceCodeRepositories/isLoading']).toBeTruthy()
        })
      })

      describe('When "status" is not "loading"', () => {
        it('returns false', () => {
          const store = createStore()

          store.state.sourceCodeRepositories.status = 'error'

          expect(store.getters['sourceCodeRepositories/isLoading']).toBeFalsy()
        })
      })
    })
  })

  describe('Actions', () => {
    describe('.getUserRepositories', () => {
      beforeAll(() => {
        mockGetUserRepositories()
      })

      it('updates to loading state', () => {
        const store = createStore()

        store.dispatch('sourceCodeRepositories/getUserRepositories', { login: 'login' })

        expect(store.state.sourceCodeRepositories).toEqual({
          repositories: [],
          status: 'loading'
        })
      })

      it('calls sourceCodeService.getUserRepositories', () => {
        const store = createStore()

        store.dispatch('sourceCodeRepositories/getUserRepositories', { login: 'login' })

        expect(getUserRepositoriesMocked).toBeCalledWith('login')
      })

      describe('When fulfilled', () => {
        beforeEach(() => {
          mockGetUserRepositories({ success: true })
        })

        it('updates to success state', async () => {
          const store = createStore()

          await store.dispatch('sourceCodeRepositories/getUserRepositories', { login: 'login' })

          expect(store.state.sourceCodeRepositories).toEqual({
            repositories: ['repo-1', 'repo-2', 'repo-3'],
            status: 'success'
          })
        })
      })

      describe('When failed', () => {
        beforeEach(() => {
          mockGetUserRepositories({ success: false })
        })

        it('updates to error state', async () => {
          const store = createStore()

          await store.dispatch('sourceCodeRepositories/getUserRepositories', { login: 'login' })

          expect(store.state.sourceCodeRepositories).toEqual({
            repositories: [],
            status: 'error'
          })
        })
      })
    })
  })
})
