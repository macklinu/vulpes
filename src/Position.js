import system from 'system-components'

export const Position = system(
  'space',
  'color',
  'zIndex',
  'top',
  'right',
  'bottom',
  'left'
)
Position.displayName = 'Position'

export const Relative = system({ is: Position }, { position: 'relative' })
Relative.displayName = 'Relative'

export const Absolute = system({ is: Position }, { position: 'absolute' })
Absolute.displayName = 'Absolute'

export const Fixed = system({ is: Position }, { position: 'fixed' })
Fixed.displayName = 'Fixed'

export const Sticky = system({ is: Position }, { position: 'sticky' })
Sticky.displayName = 'Sticky'
