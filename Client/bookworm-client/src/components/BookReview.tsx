import { Box, Text, Container, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { ReviewData } from "../helpers/interfaces";

import { FaUserCircle } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ReviewItem = (props: { review: ReviewData }) => {
  var stars = [];
  const normalizedPoints: number =
    Math.abs(props.review.points) > 5 ? 5 : Math.abs(props.review.points);

  for (let i = 0; i < normalizedPoints; i++) {
    stars.push(<Icon w={5} h={5} as={AiFillStar}></Icon>);
  }
  for (let i = 0; i < 5 - normalizedPoints; i++) {
    stars.push(<Icon w={5} h={5} as={AiOutlineStar}></Icon>);
  }
  return (
    <Container
      maxW="container.lg"
      mb="5"
      p="2rem"
      borderColor="brand.100"
      borderWidth="3px"
      borderRadius="3xl"
      boxShadow="md"
      minHeight="10rem"
    >
      <Flex>
        <Box>
          <Icon w={8} h={8} as={FaUserCircle}></Icon>
        </Box>
        <Box pl="1rem" fontSize="xl" fontWeight="bold">
          <Text>{props.review.author}</Text>
        </Box>
      </Flex>
      <Box borderBottom="0.2rem solid" borderColor="brand.100" w="50%" />
      <Flex my="3" textColor="brand.200">
        {stars}
      </Flex>
      <Flex mt="2rem" textAlign="left" maxW="container.lg">
        <Text>{props.review.text}</Text>
      </Flex>
    </Container>
  );
};

const BookReview = (props: { reviews: ReviewData[] }) => {
  const reviewItems = props.reviews.map((r) => <ReviewItem review={r} />);

  return (
    <React.Fragment>
      <Box w="100%">
        <Container
          my="2rem"
          maxW="container.lg"
          textColor="white"
          p="1rem"
          bg="brand.100"
          borderRadius="3xl"
          boxShadow="md"
        >
          <Text fontSize="3xl">Reviews</Text>
        </Container>
        {reviewItems}
      </Box>
    </React.Fragment>
  );
};

export default BookReview;
