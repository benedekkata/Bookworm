import { Box, Flex, Image, Text, Icon, Button } from "@chakra-ui/react";

import React from "react";
import bookDefaultImg from "../../assets/images/books.png";
import { FiEdit } from "react-icons/fi";
import { BookData } from "../../helpers/interfaces";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const WishList = (props: { wishlistItems: BookData[] | undefined }) => {
  const navigate = useNavigate();
  const items = props.wishlistItems?.map((book, i) => {
    return (
      <Box
        key={`${i}_prevreading_elem`}
        textColor="white"
        textAlign="left"
        m="2rem"
      >
        <Flex
          my="3rem"
          p="3"
          bg="brand.100"
          borderRadius="3xl"
          boxShadow="md"
          minHeight="10rem"
          justifyContent="space-between"
        >
          <Image
            borderRadius="full"
            boxSize="100px"
            boxShadow="md"
            mt="1rem"
            src={book.image}
            onError={(e: any) => {
              e.target.onError = null;
              e.target.src = bookDefaultImg;
            }}
            onClick={() => {
              navigate(`/bookdetails/${book.isbn13}`);
            }}
            _hover={{ cursor: "pointer" }}
            alt="Image"
          />
          <Box w="75%" pl="3rem" mt="1rem">
            <Box display="flex" fontSize="xl" textColor="white">
              <Text align="left">{book.title}</Text>
            </Box>

            <Box display="flex" fontSize="md" mb="2" textColor="brand.300">
              {book.authors.join("«»")}
            </Box>
            <Box
              display="flex"
              sx={{ borderBottom: "0.2rem solid #FF9C27" }}
              w="100%"
            />
          </Box>
          <Box>
            <Icon
              as={AiOutlineCloseCircle}
              _hover={{ cursor: "pointer" }}
              w={7}
              h={7}
              color="white"
            />
          </Box>
        </Flex>
      </Box>
    );
  });
  return <Box>{items}</Box>;
};

export default WishList;
