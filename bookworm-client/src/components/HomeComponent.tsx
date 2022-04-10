import {
  Box,
  Container,
  Flex,
  Icon,
  Input,
  Image,
  Checkbox,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { HomeProps } from "../interfaces";
import BookList from "./SearchResultsComponent";
import { FaSearch } from "react-icons/fa";
import whiteLogo from "../images/white_book.png";
import whiteLogoRight from "../images/white_book_right.png";

const Home = (props: HomeProps) => {
  const [bookResultList, setBookResultList] = useState(props.testData);
  const [searchValue, setSearchValue] = useState("");

  const [onlyReview, setOnlyReview] = React.useState("1");

  const filterBookList = () => {
    const newList = props.testData.filter((item) => {
      const authorsMatch: boolean = item.authors
        .join(" ")
        .toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase());
      return (
        item.title
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase()) || authorsMatch
      );
    });
    setBookResultList(newList);
  };
  return (
    <React.Fragment>
      <Box bg="brand.200" height="200px">
        <Image
          className="removeMobile"
          borderRadius="10px"
          w="15rem"
          h="15rem"
          position="absolute"
          mt="-5px"
          opacity="75%"
          src={whiteLogo}
          alt="Bookworm"
        />
        <Image
          className="removeMobile"
          borderRadius="10px"
          w="13rem"
          h="13rem"
          right="0"
          position="absolute"
          mt="-75px"
          opacity="75%"
          src={whiteLogoRight}
          alt="Bookworm"
        />
        <Container fontSize="3xl" textColor="white" pt="1rem" w="100%">
          Find a book
        </Container>
        <Container
          minH="5px"
          w="75%"
          mb="1.5rem"
          className="removeMobile"
          sx={{ borderBottom: "0.2rem solid white" }}
        ></Container>
        <Flex justifyContent="center" mt="1.5rem">
          <Input
            placeholder="You can search for title and author..."
            textColor="white"
            borderRadius="full"
            w="50%"
            borderColor="brand.100"
            borderWidth="3px"
            bg="brand.100"
            id="bookSearch"
            size="md"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Flex
            ml="-25px"
            mt="-10.5px"
            zIndex={1}
            borderRadius="full"
            boxSize="60px"
            bg="brand.100"
            boxShadow="md"
            justifyContent="center"
            onClick={filterBookList}
          >
            <Icon as={FaSearch} w={7} h={7} mt="15px" color="white" />
          </Flex>
        </Flex>
        <Container textColor="white">
          <Checkbox>Only show reviewed by me</Checkbox>
        </Container>
      </Box>
      <BookList list={bookResultList} />,
    </React.Fragment>
  );
};

export default Home;
