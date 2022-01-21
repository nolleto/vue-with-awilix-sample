import { StoreType } from '@/store/Store'

const plugin = (store: StoreType): void => {
  const updateContainer = (): void => {
    store.dispatch('container/updateContainer')
  }

  // Initial setup
  setTimeout(updateContainer, 1)

  store.subscribe((mutation): void => {
    if (mutation.type === 'configs/setConfigs') {
      updateContainer()
    }
  })
}

export default plugin