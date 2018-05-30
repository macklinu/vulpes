import * as React from 'react'
import { Box } from 'vulpes'
import Markdown from './Markdown'
import PageTitle from './PageTitle'
import Description from './Description'

export default function NotFound({
  title = 'Not Found',
  description = 'The page you have requested was not found.',
}) {
  return (
    <Box>
      <PageTitle>{title}</PageTitle>
      <Description>
        <Markdown>{description}</Markdown>
      </Description>
    </Box>
  )
}
NotFound.displayName = 'NotFound'
