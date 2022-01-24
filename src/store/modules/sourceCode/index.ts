import info from './info'
import repositories from './repositories'
import users from './users'

export default {
  namespaced: true,
  modules: {
    users,
    repositories,
    info
  }
}
