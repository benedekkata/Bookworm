import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Text,
  Icon,
  WrapItem,
  Divider,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdDone } from "react-icons/md";
import { BookData, CaruselProps, ReadingRecord } from "../helpers/interfaces";

const CurrentReadingCarusel = (props: CaruselProps) => {
  const [page, setPage] = useState(1);

  const carouselItems = props.currentReadings.map((rr, i) => {
    if (i < page * 3 && i >= page * 3 - 3) {
      return (
        <Box
          minH="10rem"
          key={`${i}_carusel_elem`}
          textColor="white"
          textAlign="left"
          borderRadius="xl"
          p="1rem"
          mx="2"
          backgroundColor="brand.100"
        >
          <Flex justifyContent="space-between">
            <WrapItem>
              <Avatar
                size="xl"
                boxShadow="xl"
                name={props.currentBooks[i]?.title}
                src={props.currentBooks[i]?.image}
              />{" "}
            </WrapItem>

            <Icon
              as={AiOutlineCloseCircle}
              w={7}
              h={7}
              mt="-0.5rem"
              mr="-0.5rem"
              color="white"
            />
          </Flex>
          <Text mt="5" as="b" fontSize="md" noOfLines={1}>
            {props.currentBooks[i]?.title}
          </Text>
          <Divider></Divider>
          <Text mt="2" as="i" fontSize="md" noOfLines={1}>
            {props.currentBooks[i]?.authors.join("«»")}
          </Text>
          <Flex
            borderRadius="full"
            boxSize="3rem"
            bg="brand.200"
            boxShadow="md"
            justifyContent="center"
            marginTop="auto"
            marginBottom="-0.5rem"
            marginRight="-0.5rem"
            ml="auto"
          >
            <Icon as={MdDone} w={6} h={6} mt="0.7rem" color="white" />
          </Flex>
        </Box>
      );
    } else {
      return "";
    }
  });

  const leftButton =
    page > 1 ? (
      <Button backgroundColor="brand.200" onClick={() => setPage(page - 1)}>
        <Icon
          sx={{ _hover: { cursor: "pointer" } }}
          color="white"
          as={AiOutlineArrowLeft}
          w={7}
          h={7}
        ></Icon>
      </Button>
    ) : (
      <Button
        backgroundColor="brand.200"
        disabled
        onClick={() => setPage(page - 1)}
      >
        <Icon
          sx={{ _hover: { cursor: "pointer" } }}
          color="white"
          as={AiOutlineArrowLeft}
          w={7}
          h={7}
        ></Icon>
      </Button>
    );

  const rightButton =
    page < Math.ceil(props.currentReadings.length / 3) ? (
      <Button
        backgroundColor="brand.200"
        sx={{ _hover: { cursor: "pointer" } }}
        onClick={() => setPage(page + 1)}
      >
        <Icon color="white" as={AiOutlineArrowRight} w={7} h={7}></Icon>
      </Button>
    ) : (
      <Button
        backgroundColor="brand.200"
        disabled
        sx={{ _hover: { cursor: "pointer" } }}
        onClick={() => setPage(page + 1)}
      >
        <Icon color="white" as={AiOutlineArrowRight} w={7} h={7}></Icon>
      </Button>
    );

  return (
    <Container minW="75%">
      <Flex justifyContent="space-between" alignItems="center">
        {leftButton}
        {carouselItems}
        {rightButton}
      </Flex>
    </Container>
  );
};

export default CurrentReadingCarusel;
