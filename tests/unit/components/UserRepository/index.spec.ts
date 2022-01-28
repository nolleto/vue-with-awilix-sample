import { fireEvent, renderCreator, screen } from '@test/component'

import UserRepository from '@/components/UserRepository/index.vue'
import { openExternalLink } from '@/router'

jest.mock('@/router')

describe('UserRepository', () => {
  const UserRepositoryHeader = {
    template: '<div>UserRepositoryHeader</div>'
  }
  const render = renderCreator(UserRepository, {
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
    stubs: { UserRepositoryHeader }
  })

  it('renders repository header', () => {
    render()

    expect(screen.getByText('UserRepositoryHeader')).toBeInTheDocument()
  })

  it('renders open repository button', () => {
    render()

    expect(screen.getByRole('button', { name: 'Open repository' })).toBeInTheDocument()
  })

  describe('When repository has description', () => {
    it('renders repository description', () => {
      render()

      expect(screen.getByText('repository description')).toBeInTheDocument()
    })
  })

  describe('When repository no description', () => {
    it('renders no description message', () => {
      render({
        propsData: {
          repository: {
            description: null
          }
        }
      })

      expect(screen.getByText('no description')).toBeInTheDocument()
    })
  })

  describe('When open repository button clicked', () => {
    it('calls openExternalLink', async () => {
      render()
      const openButton = screen.getByRole('button', { name: 'Open repository' })

      await fireEvent.click(openButton)

      expect(openExternalLink).toBeCalledWith('repository url')
    })
  })
})
