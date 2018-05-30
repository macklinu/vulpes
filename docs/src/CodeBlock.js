import * as React from 'react'
import { Box, Text, Pre } from 'vulpes'
import * as Vulpes from 'vulpes'
import styled from 'styled-components'
import { LiveProvider, LivePreview, LiveEditor, LiveError } from 'react-live'
import { color, space, themeGet, border } from 'styled-system'

const Preview = styled(LivePreview)`
  padding: 16px;
  margin-bottom: 16px;
  background-color: ${themeGet('colors.white')};
  border-radius: 2px;
  ${border};
`
Preview.displayName = 'Preview'

Preview.defaultProps = {
  border: 1,
}

const Err = styled(LiveError)`
  font-family: 'Roboto Mono', 'SF Mono', Menlo, monospace;
  top: 0;
  right: 0;
  left: 0;
  padding: 16px;
  color: #fff;
  background-color: #f00;
`
Err.displayName = 'Err'

const Editor = styled(LiveEditor)`
  font-family: 'Roboto Mono', 'SF Mono', Menlo, monospace;
  margin: 0;
  padding: 16px;
  tab-size: 2;
  white-space: pre-wrap;
  overflow: auto;
  border-radius: 2px;
  ${color};
  &:focus {
    outline: none;
  }
`
Editor.displayName = 'Editor'

Editor.defaultProps = {
  color: 'text',
  bg: 'grey.0',
}

const FatalError = styled(Vulpes.Pre)`
  ${color};
  ${space};
  white-space: pre-wrap;
  overflow: auto;
`
FatalError.defaultProps = {
  bg: 'red',
  color: 'white',
  p: 3,
}

function getCode(children) {
  return React.Children.toArray(children)
    .filter(child => typeof child === 'string')
    .join('\n')
}

export default class CodeBlock extends React.Component {
  static displayName = 'CodeBlock'

  constructor(props) {
    super(props)
    this.state = {
      initialCode: getCode(props.children),
      code: getCode(props.children),
      err: null,
    }
  }

  reset = () => {
    this.setState(prevState => ({
      code: prevState.initialCode,
      err: null,
    }))
  }

  componentWillReceiveProps({ children }) {
    this.setState({
      err: null,
      code: getCode(children),
    })
  }

  componentDidCatch(err) {
    this.setState({ err })
  }

  render() {
    if (this.props.lang !== 'jsx') {
      return <Pre children={this.props.children} />
    }

    return (
      <Box mb={3}>
        {this.state.err ? (
          <Vulpes.Box>
            <FatalError children={this.state.err.message} />
            <Vulpes.Button onClick={this.reset} children="Reset Example" />
          </Vulpes.Box>
        ) : (
          <LiveProvider
            code={this.state.code}
            scope={Vulpes}
            mountStylesheet={false}
          >
            <Preview />
            <Editor />
            <Text fontSize={10} align="right" mt={-20} mr={1} color="text">
              Live Code
            </Text>
            <Err />
          </LiveProvider>
        )}
      </Box>
    )
  }
}
