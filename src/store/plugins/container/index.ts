import { StoreType } from '@/store/Store'

const containerPlugin = (store: StoreType): void => {
  const updateContainer = (): void => {
    store.dispatch('container/updateContainer')
  }

  // Initial setup
  updateContainer()

  store.subscribe((mutation): void => {
    if (mutation.type === 'configs/setConfigs') {
      updateContainer()
    }
  })
}

export default containerPlugin
