import styled from 'styled-components'
import { Box } from '.'
import { theme } from './theme'
import { borderRadius, themeGet } from 'styled-system'

const boxShadow = props => {
  const boxShadows = {
    sm: {
      'box-shadow': props.theme.boxShadows[0],
    },
    md: {
      'box-shadow': props.theme.boxShadows[1],
    },
    lg: {
      'box-shadow': props.theme.boxShadows[2],
    },
    xl: {
      'box-shadow': props.theme.boxShadows[3],
    },
  }
  return boxShadows[props.boxShadowSize]
}

const boxBorder = props => ({
  border: `${props.borderWidth}px solid ${themeGet(
    'colors.' + props.borderColor
  )(props)}`,
})

export const Card = styled(Box)`
  ${boxShadow};
  ${boxBorder};
  ${borderRadius};
`

Card.defaultProps = {
  borderColor: 'grey.0',
  borderRadius: 1,
  borderWidth: 1,
  theme: theme,
}

Card.displayName = 'Card'
