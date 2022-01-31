import { renderCreator, screen } from '@test/component'

import UserRepositories from '@/components/UserRepositories/index.vue'
import { useSourceCodeRepositories } from '@/store/modules/sourceCode/repositories'

jest.mock('@/store/modules/sourceCode/repositories')
jest.mock('@/components/UserRepository/index.vue')

const mockUseSourceCodeRepositories = ({
  repositories = [] as any[],
  isLoading = false,
  getUserRepositories = jest.fn(),
  hasError = false,
  errorMessage = null as string | null
} = {}) => {
  const useSourceCodeRepositoriesMocked = useSourceCodeRepositories as jest.Mock

  useSourceCodeRepositoriesMocked.mockReturnValue({
    repositories,
    isLoading,
    getUserRepositories,
    hasError,
    errorMessage
  })
}

describe('UserRepositories', () => {
  const UserRepository = {
    template: '<div>UserRepository</div>'
  }
  const render = renderCreator(UserRepositories, {
    propsData: {
      user: {
        id: 'user id',
        login: 'user login',
        avatarUrl: 'user avatarUrl'
      }
    },
    stubs: { UserRepository }
  })

  describe('On mounted', () => {
    it('calls getUserRepositories', () => {
      const getUserRepositories = jest.fn()
      mockUseSourceCodeRepositories({ getUserRepositories })
      render()

      expect(getUserRepositories).toBeCalledWith({
        id: 'user id',
        login: 'user login',
        avatarUrl: 'user avatarUrl'
      })
    })
  })

  describe('When is loading', () => {
    beforeEach(() => {
      mockUseSourceCodeRepositories({ isLoading: true })
    })

    it('renders title with loading state', () => {
      render()

      expect(screen.getByText('Loading user login repositories...')).toBeInTheDocument()
    })

    it('does not render repositories', () => {
      render()

      expect(screen.queryByTestId('user-repositories-container')).not.toBeInTheDocument()
    })

    it('does not render error', () => {
      render()

      expect(screen.queryByTestId('user-repositories-error')).not.toBeInTheDocument()
    })
  })

  describe('When is loaded', () => {
    describe('with success', () => {
      beforeEach(() => {
        mockUseSourceCodeRepositories({ isLoading: false, repositories: Array(10).fill({}) })
      })

      it('renders title with loaded state', () => {
        render()

        expect(screen.getByText('user login has 10 repositories')).toBeInTheDocument()
      })

      it('renders repositories', () => {
        render()

        expect(screen.queryAllByText('UserRepository')).toHaveLength(10)
      })

      it('does not render error', () => {
        render()

        expect(screen.queryByTestId('user-repositories-error')).not.toBeInTheDocument()
      })
    })

    describe('with error', () => {
      beforeEach(() => {
        mockUseSourceCodeRepositories({ hasError: true, errorMessage: 'Error message' })
      })

      it('does not render title', () => {
        render()

        expect(screen.queryByTestId('user-repositories-title')).not.toBeInTheDocument()
      })

      it('does not render repositories', () => {
        render()

        expect(screen.queryByTestId('user-repositories-container')).not.toBeInTheDocument()
      })

      it('renders error message', () => {
        render()

        expect(screen.getByText('Error message')).toBeInTheDocument()
      })
    })
  })
})
