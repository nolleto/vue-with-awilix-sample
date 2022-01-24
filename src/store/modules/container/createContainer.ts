import { AwilixContainer, asClass, createContainer } from 'awilix'

import GithubApiService from '@/services/sourceCode/github/GithubApiService'
import SourceCodeMockService from '@/services/sourceCode/SourceCodeMockService'
import { SourceCodeService } from '@/services/sourceCode/SourceCodeService'

type ContainerDependencies = {
  sourceCodeService: SourceCodeService
}
type ContainerType = AwilixContainer<ContainerDependencies>
type Props = {
  isPreviewMode: boolean
}

const createDIContainer = (props: Props): ContainerType => {
  const { isPreviewMode } = props
  const container = createContainer<ContainerDependencies>()

  container.register({
    sourceCodeService: asClass(isPreviewMode ? SourceCodeMockService : GithubApiService)
  })

  return container
}

export { ContainerType }
export default createDIContainer
