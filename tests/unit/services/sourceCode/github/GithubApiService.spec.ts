import GithubApiService from '@/services/sourceCode/github/GithubApiService'
import { Octokit } from '@octokit/core'

jest.mock('@octokit/core')

const mockOctokit = ({ request } = { request: jest.fn() }) => {
  const mockedOctokit = Octokit as unknown as jest.Mock
  const octokit = function () {
    return { request }
  }

  mockedOctokit.mockImplementation(octokit)
}

describe('GithubApiService', () => {
  const createService = () => {
    return new GithubApiService()
  }

  describe('.name', () => {
    it('returns Github', () => {
      const service = createService()

      expect(service.name).toBe('Github')
    })
  })

  describe('.searchUser', () => {
    it('calls octokit.request', async () => {
      const request = jest.fn(async () => ({ data: { items: [] } }))
      mockOctokit({ request })
      const service = createService()

      await service.searchUser('term')

      expect(request).toBeCalledWith('GET /search/users', {
        q: 'term'
      })
    })

    it('returns users', async () => {
      const request = jest.fn(async () => ({
        data: {
          items: [
            {
              id: 'id 1',
              login: 'login 1',
              avatar_url: 'avatar_url 1'
            },
            {
              id: 'id 2',
              login: 'login 2',
              avatar_url: 'avatar_url 2'
            }
          ]
        }
      }))
      mockOctokit({ request })
      const service = createService()
      const users = await service.searchUser('term')

      expect(users).toEqual([
        {
          id: 'id 1',
          login: 'login 1',
          avatarUrl: 'avatar_url 1'
        },
        {
          id: 'id 2',
          login: 'login 2',
          avatarUrl: 'avatar_url 2'
        }
      ])
    })
  })

  describe('.getUserRepositories', () => {
    it('calls octokit.request', async () => {
      const request = jest.fn(async () => ({ data: [] }))
      mockOctokit({ request })
      const service = createService()

      await service.getUserRepositories('username')

      expect(request).toBeCalledWith('GET /users/{username}/repos', {
        username: 'username',
        sort: 'updated'
      })
    })

    it('returns users', async () => {
      const request = jest.fn(async () => ({
        data: [
          {
            id: 'id 1',
            name: 'name 1',
            description: 'description 1',
            html_url: 'html url 1',
            forks_count: 123,
            open_issues_count: 123,
            stargazers_count: 123
          },
          {
            id: 'id 2',
            name: 'name 2',
            description: 'description 2',
            html_url: 'html url 2'
          }
        ]
      }))
      mockOctokit({ request })
      const service = createService()
      const repositories = await service.getUserRepositories('username')

      expect(repositories).toEqual([
        {
          id: 'id 1',
          name: 'name 1',
          description: 'description 1',
          url: 'html url 1',
          forksCount: 123,
          openIssuesCount: 123,
          starCount: 123
        },
        {
          id: 'id 2',
          name: 'name 2',
          description: 'description 2',
          url: 'html url 2',
          forksCount: 0,
          openIssuesCount: 0,
          starCount: 0
        }
      ])
    })
  })
})
