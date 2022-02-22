import { AnimatePresence, motion } from 'framer-motion';
import { Button, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const ThemeToggleButton = () => {
  const { toggleColorMode } = useColorMode();
  const IconColor = useColorModeValue('white', 'white');

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.div
        style={{ display: 'inline-block' }}
        key={useColorModeValue('light', 'dark')}
        initial={{ opacity: 0, y: '60%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '60%' }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}>
        <Button aria-label='Toggle theme' variant='ghost' bg={useColorModeValue('purple.300', 'orange.300')} onClick={toggleColorMode} _focus={{ border: 'none' }}>
          {useColorModeValue(<MoonIcon color={IconColor} />, <SunIcon color={IconColor} />)}
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};

export default ThemeToggleButton;
