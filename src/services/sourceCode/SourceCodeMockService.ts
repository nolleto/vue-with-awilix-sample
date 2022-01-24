import {
  SourceCodeService,
  SourceCodeServiceGetUserRepositoriesResult,
  SourceCodeServiceSearchUserResult
} from './SourceCodeService'

import faker from 'faker'

const createArrayWithLength = (length: number) => Array(length).fill(null)

const sleep = (time: number) => new Promise(resolve => {
  setTimeout(resolve, time)
})

class SourceCodeMockService implements SourceCodeService {
  name = 'Mock'

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async searchUser(term: string): SourceCodeServiceSearchUserResult {
    await sleep(1000)

    return createArrayWithLength(10).map((_, index) => ({
      id: index,
      avatarUrl: `https://i.pravatar.cc/150?img=${index + 1}`,
      login: faker.name.findName()
    }))
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getUserRepositories(username: string): SourceCodeServiceGetUserRepositoriesResult {
    await sleep(2000)

    return createArrayWithLength(10).map((_, index) => {
      const id = index + 1

      return {
        id,
        name: faker.git.branch(),
        description: faker.lorem.paragraph(2),
        forksCount: faker.datatype.number(100),
        openIssuesCount: faker.datatype.number(100),
        starCount: faker.datatype.number(100),
        url: 'https://github.com/nolleto/vue-with-awilix-sample'
      }
    })
  }
}

export default SourceCodeMockService
