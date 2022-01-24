import { StoreType } from '@/store/Store'

const sourceCodeInfoPlugin = (store: StoreType): void => {
  store.subscribe((mutation): void => {
    if (mutation.type === 'container/setContainer') {
      store.dispatch('sourceCode/info/updateSourceCodeService')
    }
  })
}

export default sourceCodeInfoPlugin
