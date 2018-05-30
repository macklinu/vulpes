import * as React from 'react'
import { Text } from 'vulpes'

export default function Description(props) {
  return <Text fontSize={[2, 3]} mb={3} color="gray" {...props} />
}
Description.displayName = 'Description'
