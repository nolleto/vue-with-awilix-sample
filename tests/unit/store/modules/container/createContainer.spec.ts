import GithubApiService from '@/services/sourceCode/github/GithubApiService'
import SourceCodeMockService from '@/services/sourceCode/SourceCodeMockService'
import containerCreator from '@/store/modules/container/createContainer'

describe('Container createContainer', () => {
  const createContainer = ({ isPreviewMode = false }: { isPreviewMode?: boolean } = {}) => {
    return containerCreator({
      isPreviewMode
    })
  }

  describe('When is preview mode', () => {
    it('inject SourceCodeMockService as sourceCodeService', () => {
      const container = createContainer({ isPreviewMode: true })

      expect(container.cradle.sourceCodeService).toBeInstanceOf(SourceCodeMockService)
    })
  })

  describe('When is not preview mode', () => {
    it('inject GithubApiService as sourceCodeService', () => {
      const container = createContainer({ isPreviewMode: false })

      expect(container.cradle.sourceCodeService).toBeInstanceOf(GithubApiService)
    })
  })
})
