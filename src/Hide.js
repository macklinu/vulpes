import styled from 'styled-components'
import { Box } from '.'

const getMaxWidth = em => em - 0.01

const breakpoints = ({ theme: { breakpoints } }) => ({
  xs: `@media screen and (max-width: ${getMaxWidth(breakpoints[0])}em)`,
  sm: `@media screen and (min-width: ${
    breakpoints[0]
  }em) and (max-width: ${getMaxWidth(breakpoints[1])}em)`,
  md: `@media screen and (min-width: ${
    breakpoints[1]
  }em) and (max-width: ${getMaxWidth(breakpoints[2])}em)`,
  lg: `@media screen and (min-width: ${
    breakpoints[2]
  }em) and (max-width: ${getMaxWidth(breakpoints[3])}em)`,
  xl: `@media screen and (min-width: ${breakpoints[3]}em)`,
})

const hidden = key => props =>
  props[key]
    ? {
        [breakpoints(props)[key]]: {
          display: 'none',
        },
      }
    : null

export const Hide = styled(Box)`
  ${hidden('xs')};
  ${hidden('sm')};
  ${hidden('md')};
  ${hidden('lg')};
  ${hidden('xl')};
`

Hide.displayName = 'Hide'
