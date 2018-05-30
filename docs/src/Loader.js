import * as React from 'react'
import Loadable from 'react-loadable'

const Markdown = LoadableComponent(() => import('./Markdown'))

function LoadableMarkdown(loader) {
  return Loadable({
    loading: () => false,
    loader,
    render(loaded, props) {
      const markdown = loaded.default
      return <Markdown children={markdown} {...props} />
    },
  })
}

function LoadableComponent(loader) {
  return Loadable({
    loading: () => false,
    loader,
  })
}

export default {
  Component: LoadableComponent,
  Markdown: LoadableMarkdown,
}
