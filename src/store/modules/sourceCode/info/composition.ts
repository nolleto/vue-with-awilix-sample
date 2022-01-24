import { RefTypes } from 'vuex-composition-helpers/dist/types/util'
import type SourceCodeInfo from '.'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

type SourceCodeInfoState = Pick<SourceCodeInfo, 'name'>

type useSourceCodeInfoReturn = {
  name: RefTypes<SourceCodeInfoState>['name']
}

const useSourceCodeInfo = (): useSourceCodeInfoReturn => {
  const { useState } = createNamespacedHelpers('sourceCode/info')
  const { name } = useState(['name']) as RefTypes<SourceCodeInfoState>

  return { name }
}

export {
  useSourceCodeInfo
}
