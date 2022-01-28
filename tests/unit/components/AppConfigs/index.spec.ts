import { fireEvent, renderCreator, screen } from '@test/component'

import AppConfigs from '@/components/AppConfigs/index.vue'
import { useConfigs } from '@/store/modules/configs'

jest.mock('@/store/modules/configs')

const mockUseConfig = ({
  updateConfigs = jest.fn(),
  isPreviewMode = false
} = {}) => {
  const mockedUseConfigs = useConfigs as jest.Mock

  mockedUseConfigs.mockReturnValue({ updateConfigs, isPreviewMode })
}

describe('AppConfigs', () => {
  const render = renderCreator(AppConfigs)

  it('renders checkbox with preview mode', () => {
    mockUseConfig({ isPreviewMode: true })

    render()
    const switchEl = screen.getByLabelText('Preview Mode')

    expect(switchEl).toBeChecked()
  })

  describe('when switch changes', () => {
    it('calls updateConfigs', () => {
      const updateConfigs = jest.fn()
      mockUseConfig({ updateConfigs, isPreviewMode: false })

      render()
      const switchEl = screen.getByLabelText('Preview Mode')

      fireEvent.click(switchEl)

      expect(updateConfigs).toBeCalledWith({ isPreviewMode: true })
    })
  })
})
