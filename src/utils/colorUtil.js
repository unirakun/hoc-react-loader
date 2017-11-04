import tinycolor from 'tinycolor2'

/* global window */
const getBackgroundColor = (node) => {
  return window.getComputedStyle(node, null).getPropertyValue('background-color')
}

export const initialColor = '#cecece'

export const findCorrectColor = (svg) => {
  let parent = svg && svg.parentNode
  let parentColor = parent ? getBackgroundColor(parent) : undefined

  while (parent && !parentColor) {
    parent = parent.parentNode
    if (parent) parentColor = getBackgroundColor(parent)
  }

  if (parentColor) {
    const tinyC = tinycolor(parentColor)
    const color = tinyC.isDark() ? tinyC.lighten(20) : tinyC.darken(20)

    return color.toHexString()
  }

  return initialColor
}