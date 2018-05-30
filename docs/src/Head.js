import * as React from 'react'
import Webfont from 'ok-webfont'

export default function Head() {
  return (
    <head>
      <title>Vulpes</title>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=0,viewport-fit=cover"
      />
      <CSS />
      <Webfont font="Lato" weights={[400]} />
      <Webfont font="Roboto Mono" />
    </head>
  )
}
Head.displayName = 'Head'

function CSS({
  css = '*{box-sizing:border-box}body{margin:0;line-height:1.5}',
}) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />
}
CSS.displayName = 'CSS'
