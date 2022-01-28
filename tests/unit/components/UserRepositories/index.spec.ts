import { renderCreator, screen } from '@test/component'

import UserRepositories from '@/components/UserRepositories/index.vue'
import { useSourceCodeRepositories } from '@/store/modules/sourceCode/repositories'

jest.mock('@/store/modules/sourceCode/repositories')
jest.mock('@/components/UserRepository/index.vue')

const mockUseSourceCodeRepositories = ({
  repositories = [] as any[],
  isLoading = false,
  getUserRepositories = jest.fn()
} = {}) => {
  const useSourceCodeRepositoriesMocked = useSourceCodeRepositories as jest.Mock

  useSourceCodeRepositoriesMocked.mockReturnValue({ repositories, isLoading, getUserRepositories })
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
    it('renders title with loading state', () => {
      mockUseSourceCodeRepositories({ isLoading: true })
      render()

      expect(screen.getByText('Loading user login repositories...')).toBeInTheDocument()
    })
  })

  describe('When is loaded', () => {
    it('renders title with loaded state', () => {
      mockUseSourceCodeRepositories({ isLoading: false, repositories: Array(10).fill({}) })
      render()

      expect(screen.getByText('user login has 10 repositories')).toBeInTheDocument()
    })

    it('renders repositories', () => {
      mockUseSourceCodeRepositories({ isLoading: false, repositories: Array(10).fill({}) })
      render()

      expect(screen.queryAllByText('UserRepository')).toHaveLength(10)
    })
  })
})
