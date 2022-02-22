import { getGithubRepoInfo } from '../../../../utils/githubAPI';
import { Text, Flex, Box, Button, Badge } from '@chakra-ui/react';
import PageMotionContainer from '../../../../components/PageMotionContainer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

export async function getServerSideProps(context) {
  const repos = await getGithubRepoInfo(context.params.username, 1, 100);
  let repo = null;
  if (repos !== null) {
    repo = repos.find(repo => repo.name === context.params.repo);
  }
  return {
    props: {
      username: context.params.username,
      reponame: context.params.repo,
      repo: repo === undefined ? null : repo,
    },
  };
}

function repo({ username, reponame, repo }) {
  const formatTimeStamp = ts => {
    const timeTag = new Date(ts);
    const year = timeTag.getFullYear();
    const month = (timeTag.getMonth() + 1).toString().padStart(2, '0');
    const day = timeTag.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if (repo === null) {
    return (
      <PageMotionContainer duration={0.8}>
        <Flex minH={'85vh'} flexDirection='column' align='center' justify='center'>
          <Text fontSize={'7xl'} fontFamily='Montserrat'>
            Oops. It seems like {reponame} does not exist. 🥵
          </Text>
        </Flex>
      </PageMotionContainer>
    );
  } else {
    return (
      <PageMotionContainer>
        <Flex minH={'85vh'} flexDirection='column' align='center'>
          <Flex w={{ base: '80%', md: '50%' }} justify='start' my={10}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link href={`/users/${username}/repos`}>
                <a>
                  <Button leftIcon={<ArrowLeftIcon />}>Back to repo list</Button>
                </a>
              </Link>
            </motion.div>
          </Flex>
          <Box w={{ base: '80%', md: '50%' }} minH='400px' bg='gray.300' borderRadius='3xl' mt={15} p={10} fontFamily='Montserrat' color='black'>
            {/* row1 */}
            <Flex w='100%' flexDirection={{ base: 'column', md: 'row' }} mb={3}>
              <Flex w={{ base: '80%', md: '40%' }}>
                <Badge colorScheme='cyan' variant='solid' px={2}>
                  Repository name
                </Badge>
              </Flex>
              <Flex w={{ base: '80%', md: '60%' }}>
                <Text>{reponame}</Text>
              </Flex>
            </Flex>
            {/* row2 */}
            <Flex w='100%' flexDirection={{ base: 'column', md: 'row' }} mb={3}>
              <Flex w={{ base: '80%', md: '40%' }}>
                <Badge colorScheme='cyan' variant='solid' px={2}>
                  Author
                </Badge>
              </Flex>
              <Link href={repo.owner.html_url}>
                <a>
                  <Flex w={{ base: '80%', md: '60%' }}>
                    <Text>{repo.owner.login}</Text>
                  </Flex>
                </a>
              </Link>
            </Flex>
            {/* row3 */}
            <Flex w='100%' flexDirection={{ base: 'column', md: 'row' }} mb={3}>
              <Flex w={{ base: '80%', md: '40%' }}>
                <Badge colorScheme='cyan' variant='solid' px={2} h='25px'>
                  Description
                </Badge>
              </Flex>
              <Flex w={{ base: '80%', md: '60%' }}>
                <Text>{repo.description ? repo.description : 'Empty description'}</Text>
              </Flex>
            </Flex>
            {/* row4 */}
            <Flex w='100%' flexDirection={{ base: 'column', md: 'row' }} mb={3}>
              <Flex w={{ base: '80%', md: '40%' }}>
                <Badge colorScheme='cyan' variant='solid' px={2}>
                  Stars
                </Badge>
              </Flex>
              <Flex w={{ base: '80%', md: '60%' }}>
                <Text>{repo.stargazers_count}</Text>
              </Flex>
            </Flex>
            {/* row5 */}
            <Flex w='100%' flexDirection={{ base: 'column', md: 'row' }} mb={3}>
              <Flex w={{ base: '80%', md: '40%' }}>
                <Badge colorScheme='cyan' variant='solid' px={2}>
                  created at
                </Badge>
              </Flex>
              <Flex w={{ base: '80%', md: '60%' }}>
                <Text>{formatTimeStamp(repo.created_at)}</Text>
              </Flex>
            </Flex>
            {/* row6 */}
            <Flex w='100%' flexDirection={{ base: 'column', md: 'row' }} mb={3}>
              <Flex w={{ base: '80%', md: '40%' }}>
                <Badge colorScheme='cyan' variant='solid' px={2}>
                  Last updated
                </Badge>
              </Flex>
              <Flex w={{ base: '80%', md: '60%' }}>
                <Text>{formatTimeStamp(repo.updated_at)}</Text>
              </Flex>
            </Flex>
          </Box>
          <Flex w={{ base: '80%', md: '50%' }} justify='end' my={10}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                rightIcon={<ArrowRightIcon />}
                onClick={() => {
                  window.open(repo.html_url, '_blank');
                }}>
                Go to Github
              </Button>
            </motion.div>
          </Flex>
        </Flex>
      </PageMotionContainer>
    );
  }
}

export default repo;
