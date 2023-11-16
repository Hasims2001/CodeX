import {   Flex, Heading, Input } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import {Button} from './Button'
import { getFileContent } from '../API/api';
export const Navbar = ({handleContent}) => {
  const searchRef = useRef("");
  const handleClick= async()=>{
    let url = searchRef.current.value;
    if(url === ""){
      alert('please write the file path...')
    }else if(!url.includes("github") || !url.includes("com") || !url.includes("https")){
      alert('invalid github url!')
    }else{
      
      url = url.split("/")
      let temp = "";
      let curr = 6
      while(curr !== url.length - 1){
        curr++;
        temp +=  "/" + url[curr] 
      }
      const updated_link = url[3] + "/" + url[4] + "/contents" + temp
      let data = await getFileContent(updated_link)
      data = atob(data.content)
      handleContent(data)
    }
  }
  return (
    <Flex justifyContent={'space-between'} px={10} alignItems={'center'} pt={3}>
        <Heading>CodeX</Heading>
        <Flex gap={'1rem'}>
          <Input ref={searchRef} type='search' placeholder='github repo url...' />
          <Button handler={handleClick} content={'Get'}></Button>
        </Flex>
    </Flex>
  )
}
