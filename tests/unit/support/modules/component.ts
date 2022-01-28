import { ConfigurationCallback, RenderOptions, RenderResult, render as TLRender } from '@testing-library/vue'

import { ComponentOptions } from 'vue'
import { VueClass } from 'vue-class-component/lib/declarations'
import VueCompositionAPI from '@vue/composition-api'

const render = <V extends Vue>(
  TestComponent: VueClass<V> | ComponentOptions<V>,
  options?: RenderOptions<V>,
  configure?: ConfigurationCallback<V>
): RenderResult => {
  return TLRender(TestComponent, options, (...args) => {
    const [vue] = args

    vue.use(VueCompositionAPI)
    // eslint-disable-next-line no-unused-expressions
    configure?.(...args)
  })
}

const renderCreator = <V extends Vue>(
  TestComponent: VueClass<V> | ComponentOptions<V>,
  options?: RenderOptions<V>,
  configure?: ConfigurationCallback<V>
) => (
  overrideOptions?: RenderOptions<V>
): RenderResult => {
    const finalOptions = {
      ...(options ?? {}),
      ...(overrideOptions ?? {})
    }

    return render(TestComponent, finalOptions, configure)
  }

export * from '@testing-library/vue'
export { default as userEvent } from '@testing-library/user-event'
export {
  render,
  renderCreator
}
