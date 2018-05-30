import * as React from 'react'
import { withRouter } from 'react-router-dom'

const ScrollTop = withRouter(
  class ScrollTop extends React.Component {
    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        window.scrollTo(0, 0)
      }
    }

    render() {
      return this.props.children
    }
  }
)
ScrollTop.displayName = 'ScrollTop'

export default ScrollTop
