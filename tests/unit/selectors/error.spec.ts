import { getErrorMessage } from '@/selectors/error'

describe('Error Selectors', () => {
  describe('.getErrorMessage', () => {
    describe('When is a "Error" instance', () => {
      it('returns error message', () => {
        const error = new Error('Error message')

        expect(getErrorMessage(error)).toBe('Error message')
      })
    })

    describe('When is not "Error" instance', () => {
      it('When no error message', () => {
        const error = {}

        expect(getErrorMessage(error)).toBe('Unknown error')
      })
    })
  })
})
