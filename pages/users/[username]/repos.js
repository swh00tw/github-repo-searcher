import { Flex, Box } from '@chakra-ui/react';
import getGithubRepoInfo from '../../../utils/githubAPI';

export async function getServerSideProps(context) {
  //console.log(context.params.username);
  const res = await getGithubRepoInfo(context.params.username);
  return {
    props: {
      username: context.params.username,
      githubRepoInfo: res,
    },
  };
}

function repos({ username, githubRepoInfo }) {
  //console.log(githubRepoInfo.length);
  return (
    <Flex minH={'100vh'} flexDirection='column'>
      {githubRepoInfo.map(repo => {
        return (
          <Box h='100px' bg='cyan.200' w='100%' my={1} key={repo.id}>
            {repo.name}
          </Box>
        );
      })}
    </Flex>
  );
}

export default repos;
