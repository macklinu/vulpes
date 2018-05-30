import * as React from 'react'
import { Heading } from 'vulpes'

export default function PageTitle(props) {
  return (
    <Heading.h1 fontSize={5} fontWeight="bold" mt={[2, 4]} mb={3} {...props} />
  )
}
PageTitle.displayName = 'PageTitle'
