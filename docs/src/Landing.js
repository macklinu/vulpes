import * as React from 'react'
import { Box } from 'vulpes'
import Description from './Description'
import PageTitle from './PageTitle'

export default function Landing() {
  return (
    <Box>
      <PageTitle children="Vulpes" />
      <Description children="Crew's design system" />
    </Box>
  )
}
Landing.displayName = 'Landing'
