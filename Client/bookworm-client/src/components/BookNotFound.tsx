import React from "react";
import { Container, Text } from "@chakra-ui/react";

const BookNotFound = () => {
  return (
    <Container
      my="3rem"
      p="3"
      bg="brand.100"
      borderRadius="3xl"
      boxShadow="md"
      w="50%"
    >
      <Text color="white" fontSize="3xl">
        The book does not exists!
      </Text>
    </Container>
  );
};

export default BookNotFound;
