import { RefTypes } from 'vuex-composition-helpers/dist/types/util'
import type SourceCodeRepositories from '.'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

type SourceCodeRepositoriesState = Pick<SourceCodeRepositories, 'repositories' | 'status'>
type SourceCodeRepositoriesGetters = Pick<SourceCodeRepositories, 'isLoading'>
type SourceCodeRepositoriesActions = Pick<SourceCodeRepositories, 'getUserRepositories'>

type useSourceCodeRepositoriesReturn = {
  repositories: RefTypes<SourceCodeRepositoriesState>['repositories']
  isLoading: RefTypes<SourceCodeRepositoriesGetters>['isLoading']
  getUserRepositories: SourceCodeRepositoriesActions['getUserRepositories']
}

const useSourceCodeRepositories = (): useSourceCodeRepositoriesReturn => {
  const { useState, useGetters, useActions } = createNamespacedHelpers('sourceCode/repositories')
  const { getUserRepositories } = useActions(['getUserRepositories']) as SourceCodeRepositoriesActions
  const { repositories } = useState(['repositories']) as RefTypes<SourceCodeRepositoriesState>
  const { isLoading } = useGetters(['isLoading']) as RefTypes<SourceCodeRepositoriesGetters>

  return { getUserRepositories, repositories, isLoading }
}

export { useSourceCodeRepositories }
