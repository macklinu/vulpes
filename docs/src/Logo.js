import * as React from 'react'
import { Flex, Heading } from 'vulpes'

export default function Logo() {
  return (
    <Flex align="center" px={[0, 3]} py={[3, 4]}>
      {/* TODO update with Image component once created? */}
      <img
        src="https://emojipedia-us.s3.amazonaws.com/thumbs/240/twitter/134/fox-face_1f98a.png"
        width={48}
        height={48}
      />
      <Heading fontSize={4} px={0} ml={2} color="red">
        Vulpes
      </Heading>
    </Flex>
  )
}
Logo.displayName = 'Logo'
