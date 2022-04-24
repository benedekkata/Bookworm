import React from "react";
import { Container, Flex, Icon, Text } from "@chakra-ui/react";

import { BsExclamationCircle } from "react-icons/bs";

const PageNotFound = () => {
  return (
    <Container
      borderRadius="2xl"
      textColor="white"
      h="5rem"
      mt="2rem"
      backgroundColor="brand.200"
    >
      <Flex alignItems="center" h="100%" w="100%">
        <Icon as={BsExclamationCircle} w={7} h={7}></Icon>
        <Text w="100%" align="center">
          Page not found! Please select a valid URL!
        </Text>
      </Flex>
    </Container>
  );
};

export default PageNotFound;
