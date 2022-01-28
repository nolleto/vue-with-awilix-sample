import { renderCreator, screen } from '@test/component'

import UserRepositoryHeader from '@/components/UserRepositoryHeader/index.vue'

jest.mock('@/store/modules/sourceCode/info', () => ({
  useSourceCodeInfo: () => ({ name: 'Source code name' })
}))

describe('UserRepositoryHeader', () => {
  const Icon = {
    props: ['name'],
    template: '<div>Icon {{name}}</div>'
  }
  const render = renderCreator(UserRepositoryHeader, {
    propsData: {
      repository: {
        id: 'repository id',
        name: 'repository name',
        description: 'repository description',
        url: 'repository url',
        forksCount: 'repository forksCount',
        openIssuesCount: 'repository openIssuesCount',
        starCount: 'repository starCount'
      }
    },
    stubs: { Icon }
  })

  it('renders title', () => {
    render()

    expect(screen.getByText('repository name')).toBeInTheDocument()
  })

  it('renders star count icon', () => {
    render()

    expect(screen.getByText('Icon star')).toBeInTheDocument()
    expect(screen.getByText('Icon star').getAttribute('title')).toBe('Source code name stars')
  })

  it('renders issues count icon', () => {
    render()

    expect(screen.getByText('Icon tasks')).toBeInTheDocument()
    expect(screen.getByText('Icon tasks').getAttribute('title')).toBe('Source code name issues')
  })

  it('renders fork count icon', () => {
    render()

    expect(screen.getByText('Icon code-branch')).toBeInTheDocument()
    expect(screen.getByText('Icon code-branch').getAttribute('title')).toBe('Source code name forks')
  })
})
