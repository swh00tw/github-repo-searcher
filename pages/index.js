import Head from 'next/head';
import Link from 'next/link';
import PageMotionContainer from '../components/PageMotionContainer';
import { Flex, Box, Heading, useColorModeValue, Input, InputRightElement, InputGroup, InputLeftElement, Divider, Button } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';

function Home({}) {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <PageMotionContainer>
      <Flex w='100%' h='100%' py={150} align='center' justify='center'>
        <Box w={{ base: '90%', md: '50%' }} h='60%' bg={useColorModeValue('cyan.500', 'cyan.700')} borderRadius={'3xl'} color='white' flexDirection={'column'}>
          <Heading fontSize={{ base: '4xl', md: '6xl' }} mt={10} px={5}>
            Type in Github username
          </Heading>
          <Heading fontSize={{ base: '4xl', md: '6xl' }} mt={10} px={5}>
            & browse all repos 💫
          </Heading>
          <Flex w='80%' mt={10}>
            <InputGroup my={10}>
              <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em' children={<FaGithub />} />
              <Input
                fontFamily={'Monserrat'}
                variant='filled'
                placeholder='Enter username'
                focusBorderColor='cyan.200'
                onChange={e => {
                  setSearch(e.target.value);
                }}
              />
            </InputGroup>
          </Flex>
          <Flex justify='center' pb={10} px={10}>
            <Link href={`/users/${search}/repos`}>
              <a>
                <motion.div whileHover={{ scale: 1.2 }}>
                  <Button
                    size='lg'
                    variant='outline'
                    rightIcon={<ArrowRightIcon />}
                    isLoading={loading}
                    isDisabled={search === ''}
                    onClick={() => {
                      setLoading(true);
                    }}>
                    Search
                  </Button>
                </motion.div>
              </a>
            </Link>
          </Flex>
        </Box>
      </Flex>
    </PageMotionContainer>
  );
}

export default Home;
