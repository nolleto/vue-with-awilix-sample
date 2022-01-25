import SourceCodeMockService from '@/services/sourceCode/SourceCodeMockService'

jest.mock('faker', () => ({
  name: {
    findName: () => 'faker name'
  },
  git: {
    branch: () => 'faker git branch'
  },
  lorem: {
    paragraph: () => 'faker lorem paragraph'
  },
  datatype: {
    number: () => 'faker datatype number'
  }
}))

describe('SourceCodeMockService', () => {
  const createService = () => {
    return new SourceCodeMockService()
  }

  describe('.name', () => {
    it('returns "Mock"', () => {
      const service = createService()

      expect(service.name).toBe('Mock')
    })
  })

  describe('.searchUser', () => {
    it('returns 10 mocked users', async () => {
      const service = createService()
      const users = await service.searchUser('term')

      expect(users).toEqual([
        {
          id: 0,
          avatarUrl: 'https://i.pravatar.cc/150?img=1',
          login: 'faker name'
        },
        {
          id: 1,
          avatarUrl: 'https://i.pravatar.cc/150?img=2',
          login: 'faker name'
        },
        {
          id: 2,
          avatarUrl: 'https://i.pravatar.cc/150?img=3',
          login: 'faker name'
        },
        {
          id: 3,
          avatarUrl: 'https://i.pravatar.cc/150?img=4',
          login: 'faker name'
        },
        {
          id: 4,
          avatarUrl: 'https://i.pravatar.cc/150?img=5',
          login: 'faker name'
        },
        {
          id: 5,
          avatarUrl: 'https://i.pravatar.cc/150?img=6',
          login: 'faker name'
        },
        {
          id: 6,
          avatarUrl: 'https://i.pravatar.cc/150?img=7',
          login: 'faker name'
        },
        {
          id: 7,
          avatarUrl: 'https://i.pravatar.cc/150?img=8',
          login: 'faker name'
        },
        {
          id: 8,
          avatarUrl: 'https://i.pravatar.cc/150?img=9',
          login: 'faker name'
        },
        {
          id: 9,
          avatarUrl: 'https://i.pravatar.cc/150?img=10',
          login: 'faker name'
        }
      ])
    })
  })

  describe('.getUserRepositories', () => {
    it('returns 10 mocked repositories', async () => {
      const service = createService()
      const repositories = await service.getUserRepositories('username')

      expect(repositories).toEqual([
        {
          id: 1,
          name: 'faker git branch',
          description: 'faker lorem paragraph',
          forksCount: 'faker datatype number',
          openIssuesCount: 'faker datatype number',
          starCount: 'faker datatype number',
          url: 'https://github.com/nolleto/vue-with-awilix-sample'
        },
        {
          id: 2,
          name: 'faker git branch',
          description: 'faker lorem paragraph',
          forksCount: 'faker datatype number',
          openIssuesCount: 'faker datatype number',
          starCount: 'faker datatype number',
          url: 'https://github.com/nolleto/vue-with-awilix-sample'
        },
        {
          id: 3,
          name: 'faker git branch',
          description: 'faker lorem paragraph',
          forksCount: 'faker datatype number',
          openIssuesCount: 'faker datatype number',
          starCount: 'faker datatype number',
          url: 'https://github.com/nolleto/vue-with-awilix-sample'
        },
        {
          id: 4,
          name: 'faker git branch',
          description: 'faker lorem paragraph',
          forksCount: 'faker datatype number',
          openIssuesCount: 'faker datatype number',
          starCount: 'faker datatype number',
          url: 'https://github.com/nolleto/vue-with-awilix-sample'
        },
        {
          id: 5,
          name: 'faker git branch',
          description: 'faker lorem paragraph',
          forksCount: 'faker datatype number',
          openIssuesCount: 'faker datatype number',
          starCount: 'faker datatype number',
          url: 'https://github.com/nolleto/vue-with-awilix-sample'
        },
        {
          id: 6,
          name: 'faker git branch',
          description: 'faker lorem paragraph',
          forksCount: 'faker datatype number',
          openIssuesCount: 'faker datatype number',
          starCount: 'faker datatype number',
          url: 'https://github.com/nolleto/vue-with-awilix-sample'
        },
        {
          id: 7,
          name: 'faker git branch',
          description: 'faker lorem paragraph',
          forksCount: 'faker datatype number',
          openIssuesCount: 'faker datatype number',
          starCount: 'faker datatype number',
          url: 'https://github.com/nolleto/vue-with-awilix-sample'
        },
        {
          id: 8,
          name: 'faker git branch',
          description: 'faker lorem paragraph',
          forksCount: 'faker datatype number',
          openIssuesCount: 'faker datatype number',
          starCount: 'faker datatype number',
          url: 'https://github.com/nolleto/vue-with-awilix-sample'
        },
        {
          id: 9,
          name: 'faker git branch',
          description: 'faker lorem paragraph',
          forksCount: 'faker datatype number',
          openIssuesCount: 'faker datatype number',
          starCount: 'faker datatype number',
          url: 'https://github.com/nolleto/vue-with-awilix-sample'
        },
        {
          id: 10,
          name: 'faker git branch',
          description: 'faker lorem paragraph',
          forksCount: 'faker datatype number',
          openIssuesCount: 'faker datatype number',
          starCount: 'faker datatype number',
          url: 'https://github.com/nolleto/vue-with-awilix-sample'
        }
      ])
    })
  })
})
