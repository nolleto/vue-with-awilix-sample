import { RefTypes } from 'vuex-composition-helpers/dist/types/util'
import type SourceCodeRepositories from '.'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

type SourceCodeRepositoriesState = Pick<SourceCodeRepositories, 'repositories' | 'status' | 'errorMessage'>
type SourceCodeRepositoriesGetters = Pick<SourceCodeRepositories, 'isLoading' | 'hasError'>
type SourceCodeRepositoriesActions = Pick<SourceCodeRepositories, 'getUserRepositories'>

type useSourceCodeRepositoriesReturn = {
  repositories: RefTypes<SourceCodeRepositoriesState>['repositories']
  errorMessage: RefTypes<SourceCodeRepositoriesState>['errorMessage']
  isLoading: RefTypes<SourceCodeRepositoriesGetters>['isLoading']
  hasError: RefTypes<SourceCodeRepositoriesGetters>['hasError']
  getUserRepositories: SourceCodeRepositoriesActions['getUserRepositories']
}

const useSourceCodeRepositories = (): useSourceCodeRepositoriesReturn => {
  const { useState, useGetters, useActions } = createNamespacedHelpers('sourceCode/repositories')
  const { getUserRepositories } = useActions(['getUserRepositories']) as SourceCodeRepositoriesActions
  const { repositories, errorMessage } = useState(['repositories', 'errorMessage']) as RefTypes<SourceCodeRepositoriesState>
  const { isLoading, hasError } = useGetters(['isLoading', 'hasError']) as RefTypes<SourceCodeRepositoriesGetters>

  return { getUserRepositories, repositories, isLoading, hasError, errorMessage }
}

export {
  useSourceCodeRepositories,
  useSourceCodeRepositoriesReturn
}
