import * as React from 'react'
import { ThemeProvider } from 'styled-components'
import { Root } from './Root'
import { theme as defaultTheme } from './theme'

export const Provider = ({ theme = {}, ...props }) => {
  return (
    <ThemeProvider theme={{ ...defaultTheme, ...theme }}>
      <Root {...props} />
    </ThemeProvider>
  )
}

Provider.displayName = 'Vulpes.Provider'
