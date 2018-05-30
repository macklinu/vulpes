import * as React from 'react'
import Markdown from './Markdown'

export default function Detail({ content }) {
  return (
    <React.Fragment>
      <Markdown children={content} />
    </React.Fragment>
  )
}
Detail.displayName = 'Detail'
