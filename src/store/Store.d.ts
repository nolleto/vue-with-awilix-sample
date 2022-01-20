import { Store } from 'vuex'
import githubUsers from '@/store/modules/github/users'
import githubRepositories from '@/store/modules/github/repositories'
import configs from '@/store/modules/configs'

type StoreData = {
  github: {
    users: githubUsers
    repositories: githubRepositories
  },
  configs: configs
}

type StoreType = Store<StoreData>;

export {
  StoreData,
  StoreType
}
