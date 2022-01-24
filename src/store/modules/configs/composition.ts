import type Configs from '.'
import { RefTypes } from 'vuex-composition-helpers/dist/types/util'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

type ConfigsState = Pick<Configs, 'isPreviewMode'>
type ConfigsActions = Pick<Configs, 'updateConfigs'>

type useConfigsReturn = {
  isPreviewMode: RefTypes<ConfigsState>['isPreviewMode']
  updateConfigs: ConfigsActions['updateConfigs']
}

const useConfigs = (): useConfigsReturn => {
  const { useState, useActions } = createNamespacedHelpers('configs')
  const { updateConfigs } = useActions(['updateConfigs']) as ConfigsActions
  const { isPreviewMode } = useState(['isPreviewMode']) as RefTypes<ConfigsState>

  return { updateConfigs, isPreviewMode }
}

export {
  useConfigs,
  useConfigsReturn
}
