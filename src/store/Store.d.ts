import { Store } from 'vuex'
import githubUsers from '@/store/modules/github/users'
import configs from '@/store/modules/configs'

type StoreData = {
  github: {
    users: githubUsers
  },
  configs: configs
}

type StoreType = Store<StoreData>;

export {
  StoreData,
  StoreType
}
