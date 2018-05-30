import * as React from 'react'
import styled from 'styled-components'
import { Box, Flex, Card, Code, Text, theme } from 'vulpes'
import Description from './Description'
import PageTitle from './PageTitle'
import partition from 'lodash/fp/partition'
import reject from 'lodash/fp/reject'

const colors = createColorData()

function createColorData() {
  const partitionColorArrayValues = partition(
    ({ value }) => !Array.isArray(value)
  )
  const rejectDarkenColor = reject(({ name }) => name === 'darken')

  const colorObjects = Object.entries(theme.colors).map(([name, value]) => ({
    name,
    value,
  }))

  const [colors, colorsWithArrayValues] = partitionColorArrayValues(
    rejectDarkenColor(colorObjects)
  )

  return colorsWithArrayValues.reduce((array, { name, value }) => {
    return [
      ...array,
      ...value.map((v, i) => ({ name: `${name}.${i}`, value: v })),
    ]
  }, colors)
}

const ColorChip = styled(Box)`
  height: 100px;
  width: 100%;
  border-radius: 2px 2px 0 0;
  transition: all 0.1s ease;
`
ColorChip.displayName = 'ColorChip'

const HexButton = styled.button`
  width: 100%;
  display: inline-block;
  position: relative;
  font-family: inherit;
  font-size: 12px;
  margin: 0;
  padding: 0;
  color: inherit;
  text-align: left;
  background-color: transparent;
  border: 0;
  border-radius: 0;
  appearance: none;
  transition: all 0.125s ease;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.08);
  &:hover {
    box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.08),
      0 16px 16px 0 rgba(0, 0, 0, 0.08);
  }
  &:active {
    transform: scale(0.9);
  }
`
HexButton.displayName = 'HexButton'

function ColorCard({ name, value }) {
  return (
    <Card borderWidth={0} m={0}>
      <HexButton>
        <ColorChip bg={value} />
        <Box p={2}>
          <Text fontSize={1} mb={1} align="left" children={name} />
          <Code fontSize={1} align="left" color="gray" children={value} />
        </Box>
      </HexButton>
    </Card>
  )
}
ColorCard.displayName = 'ColorCard'

function Column(props) {
  return (
    <Box {...props} width={[1 / 2, null, 1 / 3, 1 / 4, 1 / 6]} mb={4} px={2} />
  )
}
Column.displayName = 'Column'

function ColorList({ colors = [] }) {
  return colors.map(color => (
    <Column key={color.name}>
      <ColorCard {...color} />
    </Column>
  ))
}
ColorList.displayName = 'ColorList'

export default function Color() {
  return (
    <Box>
      <PageTitle>Color</PageTitle>
      <Description>
        The more colors you use, the more complicated the design becomes; more
        messages and feelings are conveyed which results in sending mixed
        messages to the user. Apply these colors to create unity and balance
        throughout our products. Use colors intentionally according to the below
        guidelines.
      </Description>
      <Flex flexWrap="wrap" mx={-2} pt={4}>
        <ColorList colors={colors} />
      </Flex>
    </Box>
  )
}
Color.displayName = 'Color'
