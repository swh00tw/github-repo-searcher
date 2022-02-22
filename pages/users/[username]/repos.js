import { Flex, Box, Text, Button, useColorModeValue, Image, Tag } from '@chakra-ui/react';
import { getGithubRepoInfo, getGithubUserInfo } from '../../../utils/githubAPI';
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import PageMotionContainer from '../../../components/PageMotionContainer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import UserCard from '../../../components/UserCard';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import RepoCard from '../../../components/RepoCard';
import SkeletonRow from '../../../components/SkeletonRow';

export async function getServerSideProps(context) {
  const res = await getGithubRepoInfo(context.params.username, 1, 10);
  const userInfo = await getGithubUserInfo(context.params.username);
  return {
    props: {
      username: context.params.username,
      githubRepoInfo: res,
      githubUserInfo: userInfo,
    },
  };
}

function repos({ username, githubRepoInfo, githubUserInfo }) {
  //console.log(githubUserInfo);
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState(githubRepoInfo);
  const [pageOffset, setPageOffset] = useState(2);
  const [finished, setFinished] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0,
  });

  // increment fetching repos
  useEffect(() => {
    const updateRepos = async () => {
      setLoading(true);
      const raw_res = await fetch(`https://api.github.com/users/${username}/repos?sort=created&per_page=10&page=${pageOffset}`);
      const res = await raw_res.json();
      if (res.length === 0) {
        setFinished(true);
      }
      setRepos([...repos, ...res]);
      setPageOffset(pageOffset + 1);
      setLoading(false);
    };

    if (!finished) {
      if (inView) {
        updateRepos();
      }
    }
  }, [inView]);

  if (repos === null || githubUserInfo === null) {
    //   user does not exist
    return (
      <PageMotionContainer duration={0.8}>
        <Flex minH={'85vh'} flexDirection='column' align='center' justify='center'>
          <Text fontSize={'7xl'} fontFamily='Montserrat'>
            Oops. It seems like {username} does not exist. 🥵
          </Text>
          <Link href='/'>
            <a>
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                <Button mt={20} p={10} size='lg' bg={useColorModeValue('cyan.500', 'cyan.700')} fontFamily='Montserrat' variant='solid'>
                  Back to homepage
                </Button>
              </motion.div>
            </a>
          </Link>
        </Flex>
      </PageMotionContainer>
    );
  } else {
    // normal case
    if (repos.length != 0) {
      return (
        <PageMotionContainer duration={0.8}>
          <Flex minH={'85vh'} flexDirection='column' align='center' justify='start'>
            <Flex w={{ base: '80%', md: '60%' }} justify='start'>
              <Link href='/'>
                <a>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
                    <Button leftIcon={<ArrowLeftIcon />} size='md' fontFamily='Montserrat' variant='solid'>
                      Back to homepage
                    </Button>
                  </motion.div>
                </a>
              </Link>
            </Flex>
            <UserCard githubUserInfo={githubUserInfo} />
            {repos.map(repo => {
              return <RepoCard repo={repo} key={repo.id} />;
            })}
            <Flex flexDirection={'row'}>
              <SkeletonRow loading={loading} />
            </Flex>
            <div ref={ref} />
          </Flex>
        </PageMotionContainer>
      );
    }
    // repos length = 0
    else {
      // ! TODO
      return (
        <PageMotionContainer duration={0.8}>
          <Flex minH={'85vh'} flexDirection='column' align='center' justify='start'>
            <Flex w={{ base: '80%', md: '60%' }} justify='start'>
              <Link href='/'>
                <a>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
                    <Button leftIcon={<ArrowLeftIcon />} size='md' fontFamily='Montserrat' variant='solid'>
                      Back to homepage
                    </Button>
                  </motion.div>
                </a>
              </Link>
            </Flex>
            <UserCard githubUserInfo={githubUserInfo} />
            <Text fontSize={{ base: '3xl', md: '7xl' }} fontFamily='Montserrat' mt={15}>
              {username} has no repo now. 😮
            </Text>
          </Flex>
        </PageMotionContainer>
      );
    }
  }
}

export default repos;
