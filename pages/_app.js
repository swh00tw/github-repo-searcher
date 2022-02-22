import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme/';
import Layout from '../components/Layout';
import { AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <AnimatePresence exitBeforeEnter initial={true}>
          <Component {...pageProps} />
        </AnimatePresence>
      </Layout>
    </ChakraProvider>
  );
}
export default MyApp;
