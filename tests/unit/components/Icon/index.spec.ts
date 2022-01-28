import { renderCreator, screen } from '@test/component'

import Icon from '@/components/Icon/index.vue'

describe('Icon', () => {
  const VueIcon = {
    template: '<div>VueIcon</div>'
  }
  const render = renderCreator(Icon, {
    propsData: {
      name: 'star'
    },
    stubs: { 'v-icon': VueIcon }
  })

  it('renders a icon', () => {
    render()

    expect(screen.getByText('VueIcon')).toBeInTheDocument()
  })

  it('renders a icon with name attribute', () => {
    render()

    expect(screen.getByText('VueIcon').getAttribute('name')).toBe('star')
  })
})
