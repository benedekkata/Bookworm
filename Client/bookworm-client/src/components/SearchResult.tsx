import React from "react";
import { Box, Container, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { BookData } from "../helpers/interfaces";
import { MdOutlineOpenInNew } from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";
import bookDefaultImg from "../assets/images/books.png";

const ListItem = (props: { key: string; value: BookData }) => {
  const authors = props.value.authors.join(" «» ");

  return (
    <Flex
      my="3rem"
      p="3"
      bg="brand.100"
      borderRadius="3xl"
      boxShadow="md"
      minHeight="10rem"
    >
      <Image
        borderRadius="full"
        boxSize="100px"
        boxShadow="md"
        src={props.value.image}
        onError={(e: any) => {
          e.target.onError = null;
          e.target.src = bookDefaultImg;
        }}
        alt="Image"
      />
      <Box w="80%" pl="5">
        <Box display="flex" fontSize="xl" textColor="white">
          <Text align="left">{props.value.title}</Text>
        </Box>
        <Box
          display="flex"
          sx={{ borderBottom: "0.2rem solid #FF9C27" }}
          w="100%"
        />
        <Box display="flex" fontSize="md">
          {authors}
        </Box>
        <Box display="flex" fontSize="md">
          {props.value.isbn13}
        </Box>
        <Box display="flex" fontSize="md">
          {props.value.datePublished}
        </Box>
        <Flex justifyContent="right">
          <Flex
            id="detail_btn_margin"
            borderRadius="full"
            boxSize="75px"
            bg="brand.200"
            boxShadow="md"
            justifyContent="center"
          >
            <RouterLink to={`/bookdetails/${props.value.isbn13}`}>
              <Icon
                as={MdOutlineOpenInNew}
                w={7}
                h={7}
                mt="23px"
                color="white"
              />
            </RouterLink>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

const SearchResult = (props: { list: BookData[] }) => {
  const numbers = props.list;

  const listItems = numbers.map((book) => (
    <ListItem key={book.isbn13.toString()} value={book} />
  ));

  return (
    <Container maxW="container.lg" alignItems="center">
      {listItems}
    </Container>
  );
};

export default SearchResult;
