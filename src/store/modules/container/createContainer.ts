import { AwilixContainer, asClass, createContainer } from 'awilix'

import GithubApiService from '@/services/github/GithubApiService'
import { GithubService } from '@/services/github/GithubService'

type ContainerDependencies = {
  githubService: GithubService
}
type ContainerType = AwilixContainer<ContainerDependencies>
type Props = {
  isPreviewMode: boolean
}

const createDIContainer = (props: Props): ContainerType => {
  const container = createContainer<ContainerDependencies>()

  container.register({
    githubService: asClass(GithubApiService)
  })

  return container
}

export { ContainerType }
export default createDIContainer
