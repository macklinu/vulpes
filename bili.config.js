module.exports = {
  format: ['umd', 'umd-min', 'cjs', 'es'],
  globals: {
    'styled-components': 'styled',
  },
  commonjs: {
    include: 'node_modules/**',
    namedExports: {
      react: [
        'React',
        'cloneElement',
        'createElement',
        'PropTypes',
        'Children',
        'Component',
      ],
      'react-is': ['isValidElementType'],
      'grid-styled': ['Flex', 'Box'],
    },
  },
}
