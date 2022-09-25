import { Box, Text, Container, Image, Flex, Icon } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BookData } from "../helpers/interfaces";

import { useNavigate, useParams } from "react-router-dom";

import { MdOutlineSave, MdArrowBack } from "react-icons/md";
import { getBookByIsbn } from "../services/BookService";
import BookNotFound from "../components/BookNotFound";

import bookDefaultImg from "../assets/images/books.png";
import Loading from "../layouts/Loading";

const SubjectChip = (props: { subject: string }) => {
  return (
    <Text
      minW="fit-content"
      borderRadius="3xl"
      align="left"
      m="1"
      px="2"
      py="0.3"
      bg="brand.200"
    >
      {props.subject}
    </Text>
  );
};

const BookDetail = () => {
  const [book, setBook] = useState<BookData>();
  const [bookNotFound, setBookNotFound] = useState(false);
  const { isbn } = useParams();
  useEffect(() => {
    getBookByIsbn(isbn || "")
      .then(setBook)
      .then(() => {
        if (!book) setBookNotFound(true);
      });
  }, []);

  const authors = book?.authors.join(" «» ");
  const subjects = book?.subjects?.map((book) => (
    <SubjectChip subject={book} />
  ));
  const regex = /<.*?>/gi;
  const navigate = useNavigate();
  const synopsis = book?.synopsis?.replace(regex, "");
  return book === undefined ? (
    bookNotFound ? (
      <BookNotFound />
    ) : (
      <Loading />
    )
  ) : (
    <React.Fragment>
      <Box w="100%">
        <Container maxW="container.lg">
          <Flex my="5">
            <Box onClick={() => navigate(-1)}>
              <Icon as={MdArrowBack} w={8} h={8} mt="0.5rem" />
            </Box>
            <Box w="100%">
              <Text fontSize="3xl">Details</Text>
            </Box>
          </Flex>
        </Container>
        <Container
          maxW="container.lg"
          mb="5"
          p="2rem"
          bg="brand.100"
          borderRadius="3xl"
          boxShadow="md"
          minHeight="10rem"
        >
          <Flex justifyContent="space-between">
            <Box ml="2">
              <Image
                borderRadius="full"
                boxSize="100px"
                boxShadow="md"
                src={book?.image}
                onError={(e: any) => {
                  e.target.onError = null;
                  e.target.src = bookDefaultImg;
                }}
                alt="Image"
              />
            </Box>

            <Box
              borderRadius="full"
              boxSize="70px"
              bg="brand.200"
              boxShadow="md"
              justifyContent="center"
            >
              <Icon as={MdOutlineSave} w={8} h={8} mt="18px" color="white" />
            </Box>
          </Flex>
          <Box w="100%" pl="3" textColor="white">
            <Box
              sx={{ borderBottom: "0.2rem solid #FF9C27" }}
              w="100%"
              pb="3"
            />
            <Box display="flex" fontSize="xl">
              <Text align="left">{book?.title}</Text>
            </Box>
            <Box display="flex" mb="1rem" fontSize="md">
              by&nbsp;
              <Text color="brand.300">{authors}</Text>
            </Box>
            <Box display="flex" mb="1rem" fontSize="md">
              Language(s):&nbsp;
              <Text>{book?.language}</Text>
            </Box>
            <Box display="flex" mb="1rem" fontSize="md">
              <Text align="justify" color="brand.300">
                {synopsis}
              </Text>
            </Box>
            <Box display="flex" fontSize="md">
              <Text>Pages:&nbsp;{book?.pages}</Text>
            </Box>
            <Box display="flex" fontSize="md">
              ISBN:&nbsp;
              <Text>
                {book?.isbn13}/{book?.isbn}
              </Text>
            </Box>
            <Box display="flex" fontSize="md" color="brand.300">
              Published by&nbsp;
              <Text>{book?.publisher}</Text>
              &nbsp;in&nbsp;
              <Text>{book?.datePublished}</Text>
            </Box>
            <Box
              display="flex"
              flexWrap="wrap"
              mt="2rem"
              fontSize="md"
              color="brand.300"
            >
              {subjects}
            </Box>
          </Box>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default BookDetail;
