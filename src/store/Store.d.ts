import { Store } from 'vuex'
import githubUsers from '@/store/modules/github/users'
import githubRepositories from '@/store/modules/github/repositories'
import configs from '@/store/modules/configs'
import { module as containerModule } from '@/store/modules/container'

type StoreData = {
  github: {
    users: githubUsers
    repositories: githubRepositories
  },
  configs: configs
  container: containerModule
}

type StoreType = Store<StoreData>;

export {
  StoreData,
  StoreType
}
