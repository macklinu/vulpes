import system from 'system-components'
import { Box } from '.'

export const Container = system(
  {
    is: Box,
    px: 3,
    mx: 'auto',
    maxWidth: 1024,
  },
  'maxWidth'
)

Container.displayName = 'Container'
