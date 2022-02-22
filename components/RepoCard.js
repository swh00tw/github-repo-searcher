import { Box, Flex, Tag, Button, Heading, useColorModeValue, Divider } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

function RepoCard({ repo }) {
  const { id, html_url, created_at, name, description } = repo;

  const timeTag = new Date(created_at);
  const year = timeTag.getFullYear();
  const month = (timeTag.getMonth() + 1).toString().padStart(2, '0');
  const day = timeTag.getDate().toString().padStart(2, '0');
  const timeTagString = `${year}-${month}-${day}`;

  return (
    <>
      <Flex w={{ base: '80%', md: '60%' }} borderRadius='xl' justify='center' flexDirection={{ base: 'column', md: 'row' }}>
        <Flex w={{ base: '100%', md: '70%' }} flexDirection='column' justify='center'>
          <Flex justifyContent={{ base: 'center', md: 'start' }}>
            <Heading fontFamily='Montserrat' fontWeight='700' fontSize={{ base: 'lg', md: '2xl' }} isTruncated>
              {name}
            </Heading>
          </Flex>
          <Flex justifyContent={{ base: 'center', md: 'start' }} pt={2}>
            <Heading fontFamily='Montserrat' fontWeight='400' fontSize={{ base: 'xs', md: 'sm' }} isTruncated>
              {description ? description : ''}
            </Heading>
          </Flex>
          <Flex justifyContent={{ base: 'center', md: 'start' }} pt={0}>
            <Tag borderRadius='full' mt={2} variant='solid' size='sm' colorScheme={useColorModeValue('yellow', 'teal')}>
              {timeTagString}
            </Tag>
          </Flex>
        </Flex>
        <Flex w={{ base: '100%', md: '30%' }} justify={{ base: 'center', md: 'end' }} py={4}>
          <Button
            rightIcon={<ChevronRightIcon />}
            size='lg'
            onClick={() => {
              window.open(html_url, '_blank');
            }}
            w={{ base: '100%', md: '60%' }}
            _focus={{ border: 'none' }}>
            Read
          </Button>
        </Flex>
      </Flex>
      <Divider w='60%' mt={3} mb={5} />
    </>
  );
}

export default RepoCard;
