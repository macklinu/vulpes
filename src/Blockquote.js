import * as React from 'react'
import { Text } from './Text'

export const Blockquote = props => (
  <Text is="blockquote" fontSize={3} m={0} pl={2} borderLeft={2} {...props} />
)

Blockquote.displayName = 'Blockquote'
