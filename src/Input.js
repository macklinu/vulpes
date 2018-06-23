import styled from 'styled-components'
import { space, theme } from 'styled-system'

const borders = ({ color, theme }) => {
  const borderColor = color ? theme.colors[color] : theme.colors.grey[1]
  const focusColor = color ? borderColor : theme.colors.blue[0]
  return {
    'border-color': borderColor,
    'box-shadow': `0 0 0 1px ${borderColor}`,
    ':focus': {
      outline: 0,
      'border-color': focusColor,
      'box-shadow': `0 0 0 2px ${focusColor}`,
    },
  }
}

export const Input = styled.input`
  appearance: none;
  display: block;
  width: 100%;
  font-family: inherit;
  color: inherit;
  font-size: ${theme('fontSizes.1')}px;
  background-color: transparent;
  border-radius: ${theme('radius')};
  border-width: 0px;
  border-style: solid;
  border-color: ${theme('colors.grey.1')};
  padding-top: 14px;
  padding-bottom: 14px;
  padding-left: 12px;
  padding-right: 12px;
  margin: 0;
  ::placeholder {
    color: ${theme('colors.gray.1')};
  }
  ::-ms-clear {
    display: none;
  }
  ${borders};
  ${space};
`

Input.displayName = 'Input'
