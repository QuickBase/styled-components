// @flow
import getComponentCssSelector from '../getComponentCssSelector'

describe('getComponentCssSelector', () => {
  const testComponentName = 'testComponent'
  const testSpecificityClass = 'moreSpecific'

  it('returns the name as selector if options are not provided', () => {
    expect(getComponentCssSelector(testComponentName)).toEqual(`.${testComponentName}`)
  })

  it('returns the name if the specificity class is not defined on options', () => {
    expect(getComponentCssSelector(testComponentName, { displayName: 'test' })).toEqual(
      `.${testComponentName}`,
    )
  })

  it('returns the name prepended with the specificity class', () => {
    expect(
      getComponentCssSelector(testComponentName, { specificityClass: testSpecificityClass }),
    ).toEqual(`.${testSpecificityClass} .${testComponentName}`)
  })
})
