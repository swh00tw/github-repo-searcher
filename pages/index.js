import Head from 'next/head';
import Link from 'next/link';
import PageMotionContainer from '../components/PageMotionContainer';
import { Flex, Box } from '@chakra-ui/react';

function Home({}) {
  return (
    <PageMotionContainer>
      <Flex w='100%' h='85vh' align='center' justify='center'>
        <Box w='50%' h='50%' bg='teal.300' borderRadius={'3xl'}>
          Search Box UI
        </Box>
      </Flex>
    </PageMotionContainer>
  );
}

export default Home;
