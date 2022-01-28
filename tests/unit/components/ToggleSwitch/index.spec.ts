import { fireEvent, renderCreator, screen } from '@test/component'

import ToggleSwitch from '@/components/ToggleSwitch/index.vue'

describe('ToggleSwitch', () => {
  const render = renderCreator(ToggleSwitch, {
    propsData: {
      label: 'Toggle switch label',
      value: true
    }
  })

  it('renders checkbox', () => {
    render()

    expect(screen.getByLabelText('Toggle switch label')).toBeInTheDocument()
  })

  it('renders checkbox checked', () => {
    render()

    expect(screen.getByLabelText('Toggle switch label')).toBeChecked()
  })

  describe('when click', () => {
    it('renders checkbox unchecked', async () => {
      render()
      const toggleSwitch = screen.getByLabelText('Toggle switch label')

      await fireEvent.click(toggleSwitch)

      expect(toggleSwitch).not.toBeChecked()
    })

    it('emits inputs', async () => {
      const input = jest.fn()
      render({
        listeners: {
          input
        }
      })
      const toggleSwitch = screen.getByLabelText('Toggle switch label')

      await fireEvent.click(toggleSwitch)

      expect(input).toBeCalledWith(false)
    })
  })
})
