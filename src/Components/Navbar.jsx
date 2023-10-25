import {  Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import { Button } from './Button'

export const Navbar = () => {
  return (
    <Flex justifyContent={'space-between'} px={10} alignItems={'center'} pt={3}>
        <Heading>CodeX</Heading>
        <Flex gap={3}>
          <Button content={"Login"}></Button>
          <Button content={"Register"}></Button>
        </Flex>
    </Flex>
  )
}
