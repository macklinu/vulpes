import * as React from 'react'
import styled from 'styled-components'
import { themeGet } from 'styled-system'
import { Box } from 'vulpes'

class Root extends React.Component {
  static displayName = 'Root'

  componentWillReceiveProps(next) {
    if (next.open !== this.props.open) {
      this.root.scrollTop = 0
    }
  }

  render() {
    return <Box {...this.props} innerRef={ref => (this.root = ref)} />
  }
}

const StickyBar = styled(Root)`
  height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  transition-property: max-height;
  transition-timing-function: ease-out;
  transition-duration: 0.0625s;
  ${themeGet('mediaQueries.sm')} {
    position: sticky;
    top: 0;
    max-height: 100vh;
    overflow-y: auto;
    flex: none;
  }
`
StickyBar.displayName = 'StickyBar'

export default StickyBar
