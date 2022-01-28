import { renderCreator, screen, userEvent } from '@test/component'

import UserSelect from '@/components/UserSelect/index.vue'
import { useSourceCodeUsers } from '@/store/modules/sourceCode/users'

jest.mock('@/store/modules/sourceCode/users')
jest.mock('@/store/modules/sourceCode/info', () => ({
  useSourceCodeInfo: () => ({ name: 'Source code name' })
}))
// eslint-disable-next-line @typescript-eslint/ban-types
jest.mock('debounce', () => (fn: Function) => (...args: unknown[]) => {
  fn(...args)
})

const mockUseSourceCodeUsers = ({
  searchUsersByTerm = jest.fn(),
  users = [] as any[],
  errorMessage = null as string | null,
  hasError = false,
  isLoading = false
} = {}) => {
  const mockedUseSourceCodeUsers = useSourceCodeUsers as jest.Mock

  mockedUseSourceCodeUsers.mockReturnValue({
    searchUsersByTerm,
    users,
    errorMessage,
    hasError,
    isLoading
  })
}

describe('UserSelect', () => {
  const render = renderCreator(UserSelect)

  it('renders select label', () => {
    mockUseSourceCodeUsers()
    render()

    expect(screen.getByText('Select a Source code name user:')).toBeInTheDocument()
  })

  it('renders select placeholder', () => {
    mockUseSourceCodeUsers()
    render()

    expect(screen.getByPlaceholderText('Type a Source code name user...')).toBeInTheDocument()
  })

  it('does not render loading in select', () => {
    mockUseSourceCodeUsers()
    render()

    expect(screen.getByText('Loading...')).not.toBeVisible()
  })

  describe('When type in select', () => {
    it('calls searchUsersByTerm', async () => {
      const searchUsersByTerm = jest.fn()
      mockUseSourceCodeUsers({ searchUsersByTerm })

      render()
      const selectInput = screen.getByRole('searchbox')

      await userEvent.type(selectInput, 'John')

      expect(searchUsersByTerm).toBeCalledWith('John')
    })

    describe('and select a user', () => {
      it('emits "input"', async () => {
        const users = [{ login: 'John' }, { login: 'Liz' }]
        const input = jest.fn()
        mockUseSourceCodeUsers({ users })

        render({
          listeners: {
            input
          }
        })
        const selectInput = screen.getByRole('searchbox')

        await userEvent.type(selectInput, 'John')
        await userEvent.click(screen.getByText('Liz'))

        expect(input).toBeCalledWith({ login: 'Liz' })
      })
    })
  })

  describe('When has error', () => {
    it('shows error message', () => {
      mockUseSourceCodeUsers({ hasError: true, errorMessage: 'Error message' })
      render()

      expect(screen.getByText('Error message')).toBeInTheDocument()
    })
  })

  describe('When is loading', () => {
    it('renders loading in select', () => {
      mockUseSourceCodeUsers({ isLoading: true })
      render()

      expect(screen.getByText('Loading...')).toBeVisible()
    })
  })
})
