import { fireEvent, renderCreator, screen } from '@test/component'

import Button from '@/components/Button/index.vue'

describe('Button', () => {
  const render = renderCreator(Button, {
    scopedSlots: {
      default: '<p>Click me!</p>'
    }
  })

  it('renders a button', () => {
    render()

    expect(screen.getByRole('button')).toHaveTextContent('Click me!')
  })

  describe('when clicked', () => {
    it('emits click', async () => {
      const click = jest.fn()
      render({
        listeners: {
          click
        }
      })

      await fireEvent.click(screen.getByRole('button'))

      expect(click).toBeCalled()
    })
  })
})
