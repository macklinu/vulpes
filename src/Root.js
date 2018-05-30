import system from 'system-components'

export const Root = system(
  {
    fontFamily: 'sans',
  },
  'fontFamily',
  {
    '& *': {
      boxSizing: 'border-box',
    },
  },
  'space',
  'color'
)

Root.displayName = 'Root'
