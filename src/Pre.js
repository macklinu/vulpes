import system from 'system-components'

export const Pre = system(
  {
    is: 'pre',
    fontSize: 1,
    fontFamily: 'mono',
    m: 0,
  },
  {
    overflow: 'auto',
  },
  'fontFamily',
  'space',
  'color'
)

Pre.displayName = 'Pre'
