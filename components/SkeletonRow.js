import React from 'react';
import { Flex } from '@chakra-ui/react';
import { FadeLoader } from 'react-spinners';

function SkeletonRow(props) {
  const visible_logic = () => {
    if (props.loading) {
      return (
        <Flex p='4'>
          <FadeLoader size='60px' color='cyan' />
        </Flex>
      );
    } else {
      return <></>;
    }
  };

  return visible_logic();
}
export default SkeletonRow;
