import * as React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { space, color, themeGet } from 'styled-system'

const BaseNavItem = styled.a`
  display: block;
  text-decoration: none;
  font-size: ${themeGet('fontSizes.2')}px;
  ${space};
  ${color};
  &:hover {
    color: ${themeGet('colors.text')};
  }
  &.active {
    color: ${themeGet('colors.red')};
    font-weight: ${themeGet('bold')};
    border-left: 4px solid ${themeGet('colors.red')};
    margin-left: -16px;
    padding-left: 28px;
  }
`
BaseNavItem.defaultProps = {
  pl: 3,
  pr: 2,
  py: 1,
  color: 'text',
}
BaseNavItem.displayName = 'BaseNavItem'

const RouterNavItem = BaseNavItem.withComponent(NavLink)
RouterNavItem.displayName = 'RouterNavItem'

export default function NavItem(props) {
  return props.href ? <BaseNavItem {...props} /> : <RouterNavItem {...props} />
}
NavItem.displayName = 'NavItem'
