// @flow
import type { Interpolation, Target } from '../types'

export default (css: Function) => {
  const constructWithOptions = (
    componentConstructor: Function,
    tag: Target,
    options: Object = {},
  ) => {
    if (typeof tag !== 'string' && typeof tag !== 'function') {
      // $FlowInvalidInputTest
      throw new Error(`Cannot create styled-component for component: ${tag}`)
    }

    /* This is callable directly as a template function */
    const templateFunction = (strings: Array<string>, ...interpolations: Array<Interpolation>) => {
      const cssWrapperStart = '.hybridUI & { '
      const cssWrapperEnd = ' }'

      // We wrap the provided css string with our own specificity class (.hybridUI)
      const updatedStrings = [...strings]
      updatedStrings[0] = `${cssWrapperStart}${updatedStrings[0]}`
      updatedStrings[updatedStrings.length - 1] = `${updatedStrings[
        updatedStrings.length - 1
      ]}${cssWrapperEnd}`

      return componentConstructor(tag, options, css(updatedStrings, ...interpolations))
    }

    /* If config methods are called, wrap up a new template function and merge options */
    templateFunction.withConfig = config =>
      constructWithOptions(componentConstructor, tag, {
        ...options,
        ...config,
      })
    templateFunction.attrs = attrs =>
      constructWithOptions(componentConstructor, tag, {
        ...options,
        attrs: { ...(options.attrs || {}), ...attrs },
      })

    return templateFunction
  }

  return constructWithOptions
}
