import { Flex, useColorModeValue, Image, Tag, Text, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaIcons, FaGithub } from 'react-icons/fa';

function UserCard({ githubUserInfo }) {
  return (
    <Flex
      flexDirection={{ base: 'column', md: 'row' }}
      w={{ base: '80%', md: '60%' }}
      bg={useColorModeValue('gray.300', 'gray.300')}
      p={5}
      my={20}
      align='center'
      justify={'space-between'}
      borderRadius={'3xl'}
      color='black'
      fontFamily={'Montserrat'}>
      <Flex w={{ base: '100%', md: '30%' }} h='100px' justify='center' h='200px' my={5}>
        <Image src={githubUserInfo.avatar_url} alt='homepage' borderRadius={'full'} />
      </Flex>
      <Flex w={{ base: '100%', md: '60%' }} my={5} flexDirection='column' align='center'>
        <Flex w='80%' justify={'start'} mb={2}>
          <Flex pr={10}>
            <Tag colorScheme={'cyan'} variant='solid'>
              Username
            </Tag>
            <Text ml='5'>{githubUserInfo.login}</Text>
          </Flex>
          {githubUserInfo.location ? (
            <Flex pr={10}>
              <Tag colorScheme={'cyan'} variant='solid'>
                Location
              </Tag>
              <Text ml='5'>{githubUserInfo.location}</Text>
            </Flex>
          ) : (
            <></>
          )}
        </Flex>
        <Flex w='80%' justify={'start'} mb={2}>
          <Flex pr={10}>
            <Tag colorScheme={'cyan'} variant='solid'>
              Public repos
            </Tag>
            <Text ml='5'>{githubUserInfo.public_repos}</Text>
          </Flex>
          <Flex pr={10}>
            <Tag colorScheme={'cyan'} variant='solid'>
              Followers
            </Tag>
            <Text ml='5'>{githubUserInfo.followers}</Text>
          </Flex>
          <Flex pr={10}>
            <Tag colorScheme={'cyan'} variant='solid'>
              Following
            </Tag>
            <Text ml='5'>{githubUserInfo.following}</Text>
          </Flex>
        </Flex>
        {githubUserInfo.bio ? (
          <Flex w='80%' justify={'start'} mb={2}>
            <Flex>
              <Tag colorScheme={'cyan'} variant='solid' mr={3} size='md'>
                Bio
              </Tag>
            </Flex>
            <Flex w='80%' overflow={'auto'} bg='gray.400' borderRadius='2xl' p={1}>
              <Text ml='5'>{githubUserInfo.bio}</Text>
            </Flex>
          </Flex>
        ) : (
          <></>
        )}
        <Flex w='60%' justify={'end'} mb={2} mt={5}>
          {githubUserInfo.blog ? (
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <Button
                leftIcon={<FaIcons />}
                size='lg'
                onClick={() => {
                  window.open('https://' + githubUserInfo.blog, '_blank');
                }}>
                Blog
              </Button>
            </motion.div>
          ) : (
            <></>
          )}
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
            <Button
              ml={5}
              leftIcon={<FaGithub />}
              size='lg'
              onClick={() => {
                window.open(githubUserInfo.html_url, '_blank');
              }}>
              Github
            </Button>
          </motion.div>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default UserCard;
