import * as React from 'react'
import { Text } from './Text'

export function Lead(props) {
  return <Text is="p" fontSize={3} lineHeight={1.25} {...props} />
}

Lead.displayName = 'Lead'
