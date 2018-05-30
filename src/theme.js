const createMediaQuery = n => `@media screen and (min-width:${n}em)`
const addAliases = (arr, aliases) =>
  aliases.forEach((key, i) =>
    Object.defineProperty(arr, key, {
      enumerable: false,
      get() {
        return this[i]
      },
    })
  )

const breakpoints = [32, 48, 64, 80].map(n => n + 'em')

const mediaQueries = breakpoints.map(createMediaQuery)

const aliases = ['sm', 'md', 'lg', 'xl']

addAliases(breakpoints, aliases)
addAliases(mediaQueries, aliases)

const colors = {
  black: '#000',
  white: '#fff',
  darken: [
    'rgba(0, 0, 0, 0.125)',
    'rgba(0, 0, 0, 0.25)',
    'rgba(0, 0, 0, 0.5)',
    'rgba(0, 0, 0, 0.75)',
  ],
  text: '#4A4A4A',
  red: '#D51939',
  darkRed: '#AD1932',
  teal: '#50A9BF',
  maroon: '#432544',
  green: '#3FC37F',
  orange: '#F5A02A',
  neonRed: '#FD6850',
  grey: ['#F8FAFB', '#E8EDEF', '#C5CBCD', '#7B878B', '#475053', '#303739'],
  blue: ['#D7EFFB', '#469AF4', '#0A4D6D'],
  lightGreen: ['#91D0C2', '#46BCA9'],
  yellow: ['#F5EBD0', '#FFD20F'],
}

const fonts = {
  sans: '"Lato", system-ui, sans-serif',
  mono: '"SF Mono", "Roboto Mono", Menlo, monospace',
}

const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 72, 96]

const fontWeights = {
  normal: 400,
  bold: 700,
}

const radii = [0, 2, 4]

const borders = [
  0,
  `1px solid ${colors.grey[1]}`,
  `2px solid ${colors.grey[1]}`,
]

const shadows = [
  'none',
  `inset 0 0 0 1px ${colors.grey[1]}`,
  `inset 0 0 0 1px ${colors.grey[1]}, 0 0 4px ${colors.grey[1]}`,
]

const boxShadows = [
  `0 0 2px 0 rgba(0,0,0,.08),0 1px 4px 0 rgba(0,0,0,.16)`,
  `0 0 2px 0 rgba(0,0,0,.08),0 2px 8px 0 rgba(0,0,0,.16)`,
  `0 0 2px 0 rgba(0,0,0,.08),0 4px 16px 0 rgba(0,0,0,.16)`,
  `0 0 2px 0 rgba(0,0,0,.08),0 8px 32px 0 rgba(0,0,0,.16)`,
]

const space = [0, 4, 8, 16, 32, 64, 128]

export const theme = {
  breakpoints,
  mediaQueries,
  borders,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  radii,
  shadows,
  space,
  boxShadows,
}
