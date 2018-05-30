import system from 'system-components'
import { themeGet } from 'styled-system'

export const Button = system(
  {
    is: 'button',
    borderColor: 'red',
    fontSize: 2,
    fontWeight: 'bold',
    lineHeight: 16 / 14,
    m: 0,
    px: 3,
    py: 2,
    borderRadius: 4,
  },
  props => ({
    fontFamily: 'inherit',
    WebkitFontSmoothing: 'antialiased',
    display: 'inline-block',
    verticalAlign: 'middle',
    textAlign: 'center',
    textDecoration: 'none',
    appearance: 'none',
    backgroundColor:
      props.type === 'primary'
        ? themeGet('colors.red')(props)
        : themeGet('colors.white')(props),
    color:
      props.type === 'primary'
        ? themeGet('colors.white')(props)
        : themeGet('colors.red')(props),
    '&:hover': {
      boxShadow: `inset 0 0 0 999px ${themeGet('colors.darken.0')(props)}`,
    },
    '&:disabled': {
      opacity: 1 / 4,
    },
  }),
  'color'
)

Button.displayName = 'Button'
