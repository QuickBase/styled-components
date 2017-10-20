// @flow

/**
 * Adjusts the css selector for the component's css to increase specificity when needed
 */
export default function getComponentCssSelector(componentName: string, options: Object) {
  if (options && options.specificityClass) {
    return `.${options.specificityClass} .${componentName}`
  }

  return `.${componentName}`
}
