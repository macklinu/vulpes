import * as React from 'react'
import {
  BrowserRouter,
  StaticRouter,
  Route,
  NavLink,
  Switch,
} from 'react-router-dom'

import { Flex, Box, Provider, Container, Heading, theme } from 'vulpes'

import Loader from './Loader'
import Head from './Head'
import ScrollTop from './ScrollTop'
import StickyBar from './StickyBar'
import NavItem from './NavItem'

const isBrowser = typeof document !== 'undefined'
const Router = isBrowser ? BrowserRouter : StaticRouter

const Logo = Loader.Component(() => import('./Logo'))
const NotFound = Loader.Component(() => import('./NotFound'))

function SectionHeader({ name }) {
  return <Heading color="text" p={3} fontSize={0} children={name} />
}

function renderNavList(list) {
  return list.map(({ path, name }) => (
    <NavItem key={name} to={path} children={name} />
  ))
}

const foundations = [
  {
    path: '/foundations/color',
    name: 'Color',
    component: Loader.Component(() => import('./Color')),
  },
  {
    path: '/foundations/typography',
    name: 'Typography',
    component: Loader.Component(() => import('./Typography')),
  },
  {
    path: '/foundations/iconography',
    name: 'Iconography',
    component: Loader.Component(() => import('./Iconography')),
  },
]

const components = [
  {
    path: '/components/button',
    name: 'Button',
    component: Loader.Markdown(() => import('./md/Button.md')),
  },
  {
    path: '/components/heading',
    name: 'Heading',
    component: Loader.Markdown(() => import('./md/Heading.md')),
  },
  {
    path: '/components/text',
    name: 'Text',
    component: Loader.Markdown(() => import('./md/Text.md')),
  },
  {
    path: '/components/truncate',
    name: 'Truncate',
    component: Loader.Markdown(() => import('./md/Truncate.md')),
  },
]

const resources = [
  {
    path: '/resources/layout',
    name: 'Layout',
    component: Loader.Markdown(() => import('./md/Layout.md')),
  },
  {
    path: '/resources/contributing',
    name: 'Contributing',
    component: Loader.Markdown(() => import('./md/Contributing.md')),
  },
]

const Sections = {
  LogoHeader: class LogoHeader extends React.Component {
    static displayName = 'LogoHeader'

    render() {
      return (
        <NavLink
          to="/"
          style={{
            textDecoration: 'none',
            fontSize: 'inherit',
          }}
        >
          <Logo />
        </NavLink>
      )
    }
  },
  Overview: class Overview extends React.Component {
    static displayName = 'Overview'

    render() {
      return (
        <NavItem to="/" exact>
          Overview
        </NavItem>
      )
    }
  },
  Foundations: class Foundations extends React.Component {
    static displayName = 'Foundations'

    render() {
      return (
        <React.Fragment>
          <SectionHeader name="Foundations" />
          {renderNavList(foundations)}
        </React.Fragment>
      )
    }
  },
  Components: class Components extends React.Component {
    static displayName = 'Components'

    render() {
      return (
        <React.Fragment>
          <SectionHeader name="Components" />
          {renderNavList(components)}
        </React.Fragment>
      )
    }
  },
  Resources: class Resources extends React.Component {
    static displayName = 'Resources'

    render() {
      return (
        <React.Fragment>
          <SectionHeader name="Resources" />
          {renderNavList(resources)}
        </React.Fragment>
      )
    }
  },
}

const routes = [
  {
    path: '/',
    name: 'Overview',
    component: Loader.Component(() => import('./Landing')),
  },
  ...foundations,
  ...components,
  ...resources,
].reduce(
  (obj, { path, name, component }) => ({
    ...obj,
    [path]: { path, name, component },
  }),
  {}
)

export default class App extends React.Component {
  static displayName = 'App'

  render() {
    function renderSections() {
      return Object.values(Sections).map(Component => (
        <Component key={Component.displayName} />
      ))
    }

    function renderRoutes() {
      return Object.values(routes).map(({ name, path, component }) => (
        <Route exact key={name} path={path} component={component} />
      ))
    }

    return (
      <React.Fragment>
        <Head />
        <Provider theme={theme}>
          <Router
            context={{}}
            basename={this.props.basename}
            location={this.props.pathname}
          >
            <ScrollTop>
              <Flex
                flexWrap="wrap"
                alignItems="start"
                color="text"
                minHeight="100vh"
              >
                <StickyBar
                  open
                  width={256}
                  px={3}
                  pb={5}
                  color="text"
                  bg="grey.0"
                >
                  {renderSections()}
                </StickyBar>
                <Box
                  width={[1, 'calc(100% - 320px)']}
                  style={{
                    flex: '1 1 auto',
                    minHeight: '100vh',
                  }}
                >
                  <Container>
                    <Switch>
                      {renderRoutes()}
                      <NotFound />
                    </Switch>
                  </Container>
                </Box>
              </Flex>
            </ScrollTop>
          </Router>
        </Provider>
      </React.Fragment>
    )
  }
}

App.defaultProps = {
  theme: {
    ...theme,
    maxWidths: [1280],
  },
}

App.getInitialProps = () => {
  const pkg = require('../../package.json')

  return { pkg }
}
