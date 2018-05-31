import styled from 'styled-components'
import { color, fontSize } from 'styled-system'

export const Code = styled.code`
  font-family: 'Roboto Mono', monospace;
  ${color};
  ${fontSize};
`

Code.displayName = 'Code'

Code.defaultProps = {
  fontSize: 2,
  color: 'blue',
}
