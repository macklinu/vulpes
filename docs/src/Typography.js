import * as React from 'react'
import { Box } from 'vulpes'
import Description from './Description'
import PageTitle from './PageTitle'

export default function Typography() {
  return (
    <Box>
      <PageTitle>Typography</PageTitle>
      <Description>
        A typography style guide limits the number of styles. Consistent and
        intentional styles create uniformity. These styles are sizes were
        created to improve readability across devices.
      </Description>
    </Box>
  )
}
Typography.displayName = 'Typography'
