import { RefTypes } from 'vuex-composition-helpers/dist/types/util'
import type SourceCodeUsers from '.'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

type SourceCodeUsersState = Pick<SourceCodeUsers, 'users'>
type SourceCodeUsersActions = Pick<SourceCodeUsers, 'search'>

type useSourceCodeUsersReturn = {
  users: RefTypes<SourceCodeUsersState>['users']
  searchUsersByTerm: SourceCodeUsersActions['search']
}

const useSourceCodeUsers = (): useSourceCodeUsersReturn => {
  const { useState, useActions } = createNamespacedHelpers('sourceCode/users')
  const { search: searchUsersByTerm } = useActions(['search']) as SourceCodeUsersActions
  const { users } = useState(['users']) as RefTypes<SourceCodeUsersState>

  return { searchUsersByTerm, users }
}

export {
  useSourceCodeUsers
}
