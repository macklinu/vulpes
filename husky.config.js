module.exports = {
  hooks: {
    'pre-commit': 'lint-staged && yarn build && git add dist',
  },
}
