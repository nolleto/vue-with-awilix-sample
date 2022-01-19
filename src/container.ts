import { asClass, createContainer } from 'awilix'

import GithubApiService from '@/services/github/GithubApiService'
import { GithubService } from '@/services/github/GithubService'

type ContainerDependencies = {
  githubService: GithubService
}

const container = createContainer<ContainerDependencies>()

container.register({
  githubService: asClass(GithubApiService)
})

export default container
