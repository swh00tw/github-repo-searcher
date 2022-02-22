import { Flex, Heading, Button, Text, useColorModeValue, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import ThemeToggleButton from './ThemeToggleButton';

function HeaderBar() {
  return (
    <Flex w='100%' bg={useColorModeValue('cyan.500', 'cyan.700')} py={5} justify='space-between'>
      <Heading mx={5} fontFamily='Montserrat' color={'white'}>
        <Link href='/'>
          <a>
            <HStack>
              <Text display={{ base: 'none', md: 'inline-block' }} fontSize={{ md: '2xl', lg: '4xl' }}>
                Github repo searching tool
              </Text>
              <Text>🧚‍♀️</Text>
            </HStack>
          </a>
        </Link>
      </Heading>
      <Flex>
        <ThemeToggleButton />
        <Button mx={5} leftIcon={<FaGithub />} bg={useColorModeValue('cyan.300', 'cyan.500')}>
          Github repo
        </Button>
      </Flex>
    </Flex>
  );
}

export default HeaderBar;
