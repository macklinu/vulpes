import styled from 'styled-components'
import PropTypes from 'prop-types'
import { color } from 'styled-system'
import { theme } from './theme'

export const Link = styled.a`
  cursor: pointer;
  text-decoration: none;
  ${color};
  &:hover {
    text-decoration: underline;
  }
`

Link.displayName = 'Link'

Link.propTypes = {
  color: PropTypes.string,
}

Link.defaultProps = {
  color: 'blue.1',
  theme: theme,
}
