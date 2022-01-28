import { openExternalLink } from '@/router'

describe('Router', () => {
  describe('.openExternalLink', () => {
    const spyWindowOpen = (returnValue = {}) => {
      const spy = jest.spyOn(window, 'open')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      spy.mockReturnValue(returnValue)

      return spy
    }

    it('calls "window.open"', () => {
      const windowOpen = spyWindowOpen()
      openExternalLink('the-link')

      expect(windowOpen).toBeCalledWith('the-link', '_blank')
    })

    it('set opener as null', () => {
      const openResult = { opener: 'opener' }

      spyWindowOpen(openResult)
      openExternalLink('the-link')

      expect(openResult).toEqual({
        opener: null
      })
    })
  })
})
