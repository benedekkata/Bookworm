import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Flex,
  Icon,
  Input,
  Image,
  Checkbox,
} from "@chakra-ui/react";
import SearchResult from "../components/SearchResult";
import { FaSearch } from "react-icons/fa";
import whiteLogo from "../assets/images/white_book.png";
import whiteLogoRight from "../assets/images/white_book_right.png";
import { BookData } from "../helpers/interfaces";
import { getBookList } from "../services/BookService";

const Home = () => {
  const [bookResultList, setBookResultList] = useState<BookData[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const loadingScreen = (
    <Box mt="2rem" className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Box>
  );
  const searchRes = <SearchResult list={bookResultList} />;
  const onClickSearch = async () => {
    setIsLoading(true);
    setBookResultList(await getBookList(searchValue));
    setIsLoading(false);
  };

  const [onlyReview, setOnlyReview] = React.useState(false);

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
            onClick={onClickSearch}
          >
            <Icon as={FaSearch} w={7} h={7} mt="15px" color="white" />
          </Flex>
        </Flex>
        <Container textColor="white">
          <Checkbox
            isChecked={onlyReview}
            onChange={(e) => setOnlyReview(e.target.checked)}
          >
            Only show reviewed by me
          </Checkbox>
        </Container>
      </Box>
      <Box>{isLoading ? loadingScreen : searchRes}</Box>
    </React.Fragment>
  );
};

export default Home;
