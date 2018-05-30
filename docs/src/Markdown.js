import * as React from 'react'
import remark from 'remark'
import remarkSlug from 'remark-slug'
import remarkReact from 'remark-react'
import detab from 'detab'
import unist from 'unist-builder'
import CodeBlock from './CodeBlock'
import Code from './Code'
import { Blockquote, Heading, Link } from 'vulpes'

function codeHandler(h, node) {
  const value = node.value ? detab(node.value + '\n') : ''
  const lang = node.lang && node.lang.match(/^[^ \t]+(?=[ \t]|$)/)

  const props = Object.assign(
    {},
    lang && {
      className: [`language-${lang}`],
      lang,
    }
  )

  return h(node.position, 'pre', props, [unist('text', value)])
}

const heading = type => props => {
  const Comp = Heading[type]
  return (
    <Comp {...props}>
      <Link href={'#' + props.id} color="inherit">
        {props.children}
      </Link>
    </Comp>
  )
}

const defaultScope = {
  h1: heading('h1'),
  h2: heading('h2'),
  h3: heading('h3'),
  h4: heading('h4'),
  h5: heading('h5'),
  h6: heading('h6'),
  a: Link,
  code: Code,
  pre: CodeBlock,
  blockquote: Blockquote,
}

// Markdown components typography and margins
// can be set with defaultProps
defaultScope.h1.defaultProps = {
  fontSize: 5,
  mt: [2, 4],
  mb: 3,
}
defaultScope.h2.defaultProps = {
  fontSize: 5,
  mt: [2, 4],
  mb: 3,
}

defaultScope.h3.defaultProps = {
  fontSize: 4,
  mt: 4,
  mb: 3,
  style: {
    fontWeight: '700',
  },
}

defaultScope.h4.defaultProps = {
  fontSize: 3,
  mt: 4,
  mb: 3,
}

export default function Markdown({ children, scope }) {
  const remarkReactComponents = Object.assign({}, defaultScope, scope)
  const text = React.Children.toArray(children)
    .filter(child => typeof child === 'string')
    .join('\n')
  const opts = {
    // pass design-system components to remark-react for rending
    remarkReactComponents,
    toHast: {
      handlers: {
        code: codeHandler,
      },
    },
  }
  const element = remark()
    .use(remarkSlug)
    .use(remarkReact, opts)
    .processSync(text).contents

  return element
}
Markdown.displayName = 'Markdown'
