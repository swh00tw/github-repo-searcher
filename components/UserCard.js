import { Flex, useColorModeValue, Image, Tag, Text, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaIcons, FaGithub } from 'react-icons/fa';
import Link from 'next/link';

function UserCard({ githubUserInfo }) {
  return (
    <Flex
      flexDirection={{ base: 'column', md: 'row' }}
      w={{ base: '80%', md: '70%' }}
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
        <Flex w='80%' justify={'space-between'} mb={2} flexDirection={{ base: 'column', md: 'row' }} align='center'>
          <Flex flexDirection={{ base: 'column', md: 'row' }}>
            <Tag mr={{ md: 5 }} colorScheme={'cyan'} variant='solid'>
              Username
            </Tag>
            <Text>{githubUserInfo.login}</Text>
          </Flex>
          {githubUserInfo.location ? (
            <Flex flexDirection={{ base: 'column', md: 'row' }}>
              <Tag mr={{ md: 5 }} colorScheme={'cyan'} variant='solid'>
                Location
              </Tag>
              <Text>{githubUserInfo.location}</Text>
            </Flex>
          ) : (
            <></>
          )}
        </Flex>
        <Flex w='80%' justify={'space-between'} mb={2} flexDirection={{ base: 'column', md: 'row' }} align='center'>
          <Flex flexDirection={{ base: 'column', md: 'row' }}>
            <Tag mr={{ md: 5 }} colorScheme={'cyan'} variant='solid'>
              Public repos
            </Tag>
            <Text>{githubUserInfo.public_repos}</Text>
          </Flex>
          <Flex flexDirection={{ base: 'column', md: 'row' }}>
            <Tag mr={{ md: 5 }} colorScheme={'cyan'} variant='solid'>
              Followers
            </Tag>
            <Text>{githubUserInfo.followers}</Text>
          </Flex>
          <Flex flexDirection={{ base: 'column', md: 'row' }}>
            <Tag mr={{ md: 5 }} colorScheme={'cyan'} variant='solid'>
              Following
            </Tag>
            <Text>{githubUserInfo.following}</Text>
          </Flex>
        </Flex>
        {githubUserInfo.bio ? (
          <Flex w='80%' justify={'start'} mb={2} flexDirection={{ base: 'column', md: 'row' }} align='center'>
            <Flex>
              <Tag mr={{ md: 5 }} colorScheme={'cyan'} variant='solid' size='md'>
                Bio
              </Tag>
            </Flex>
            <Flex w='80%' overflow={'auto'} bg='gray.400' borderRadius='2xl' p={1} mt={1}>
              <Text ml='5'>{githubUserInfo.bio}</Text>
            </Flex>
          </Flex>
        ) : (
          <></>
        )}
        <Flex w='60%' justify={'end'} mb={2} mt={5} flexDirection={{ base: 'column', md: 'row' }} align='center'>
          {githubUserInfo.blog ? (
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <Link href={githubUserInfo.blog.includes('https://') ? githubUserInfo.blog : 'https://' + githubUserInfo.blog}>
                <a>
                  <Button leftIcon={<FaIcons />} size='lg'>
                    Website
                  </Button>
                </a>
              </Link>
            </motion.div>
          ) : (
            <></>
          )}
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
            <Button
              ml={{ md: '5' }}
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
