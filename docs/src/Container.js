import * as React from 'react'
import { Container as VulpesContainer } from 'vulpes'

export default function Container(props) {
  return <VulpesContainer {...props} px={3} maxWidth={1280} />
}
Container.displayName = 'Container'
