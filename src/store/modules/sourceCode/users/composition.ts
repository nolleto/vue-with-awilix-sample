import { RefTypes } from 'vuex-composition-helpers/dist/types/util'
import type SourceCodeUsers from '.'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

type SourceCodeUsersState = Pick<SourceCodeUsers, 'users' | 'errorMessage'>
type SourceCodeUsersGetters = Pick<SourceCodeUsers, 'hasError' | 'isLoading'>
type SourceCodeUsersActions = Pick<SourceCodeUsers, 'search'>

type useSourceCodeUsersReturn = {
  users: RefTypes<SourceCodeUsersState>['users']
  errorMessage: RefTypes<SourceCodeUsersState>['errorMessage']
  hasError: RefTypes<SourceCodeUsersGetters>['hasError']
  isLoading: RefTypes<SourceCodeUsersGetters>['isLoading']
  searchUsersByTerm: SourceCodeUsersActions['search']
}

const useSourceCodeUsers = (): useSourceCodeUsersReturn => {
  const { useState, useGetters, useActions } = createNamespacedHelpers('sourceCode/users')
  const { search: searchUsersByTerm } = useActions(['search']) as SourceCodeUsersActions
  const { users, errorMessage } = useState(['users', 'errorMessage']) as RefTypes<SourceCodeUsersState>
  const { hasError, isLoading } = useGetters(['hasError', 'isLoading']) as RefTypes<SourceCodeUsersGetters>

  return { searchUsersByTerm, users, hasError, errorMessage, isLoading }
}

export {
  useSourceCodeUsers,
  useSourceCodeUsersReturn
}
