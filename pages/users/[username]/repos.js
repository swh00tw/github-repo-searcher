import { Flex, Box, Text } from '@chakra-ui/react';
import getGithubRepoInfo from '../../../utils/githubAPI';
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import PageMotionContainer from '../../../components/PageMotionContainer';

export async function getServerSideProps(context) {
  const res = await getGithubRepoInfo(context.params.username, 1);
  return {
    props: {
      username: context.params.username,
      githubRepoInfo: res,
    },
  };
}

function repos({ username, githubRepoInfo }) {
  const [repos, setRepos] = useState(githubRepoInfo);
  const [pageOffset, setPageOffset] = useState(2);
  const [finished, setFinished] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0,
  });

  // increment fetching repos
  useEffect(() => {
    const updateRepos = async () => {
      const raw_res = await fetch(`https://api.github.com/users/${username}/repos?sort=created&per_page=10&page=${pageOffset}`);
      const res = await raw_res.json();
      if (res.length === 0) {
        setFinished(true);
      }
      setRepos([...repos, ...res]);
      setPageOffset(pageOffset + 1);
    };

    if (!finished) {
      if (inView) {
        updateRepos();
      }
    }
  }, [inView]);

  if (repos === null) {
    //   user does not exist
    return (
      // ! TODO
      <PageMotionContainer duration={0.8}>
        <Flex minH={'85vh'} flexDirection='column' align='center' justify='center'>
          <Text fontSize={'7xl'} fontFamily='Montserrat'>
            Oops. It seems like {username} does not exist. 🥵
          </Text>
        </Flex>
      </PageMotionContainer>
    );
  } else {
    // normal case
    if (repos.length != 0) {
      return (
        <PageMotionContainer duration={0.8}>
          <Flex minH={'100vh'} flexDirection='column'>
            {repos.map(repo => {
              return (
                <Box h='100px' bg='cyan.200' w='100%' my={1} key={repo.id} align='center' justify='center'>
                  <Text>{repo.name}</Text>
                </Box>
              );
            })}
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
          <Flex minH={'100vh'} flexDirection='column'>
            <Text fontSize={'7xl'} fontFamily='Montserrat'>
              {username} has no repo now. 😮
            </Text>
          </Flex>
        </PageMotionContainer>
      );
    }
  }
}

export default repos;
