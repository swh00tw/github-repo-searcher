import Head from 'next/head';
import HeaderBar from '../components/HeaderBar.js';
import Footer from '../components/Footer.js';
import { Box, useColorModeValue } from '@chakra-ui/react';

function Layout(props) {
  return (
    <>
      {/* TODO: change after finishe project */}
      <Head>
        <title>Github repo searcher</title>
        <meta name='description' content='Github repo searcher' />
        <link rel='icon' href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧚‍♀️</text></svg>' />
      </Head>

      <HeaderBar />

      <Box bg={useColorModeValue('gray.100', 'black')} align='center' flexDirection='column' maxW='screen-md' mx='auto' overflow='visible' p='64px'>
        {props.children}
      </Box>

      <Footer />
    </>
  );
}

export default Layout;
