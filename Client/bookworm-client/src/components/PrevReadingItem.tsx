import { Box, Flex, Image, Text, Icon } from "@chakra-ui/react";

import React, { useRef } from "react";
import { PrevReadingListProps } from "../helpers/interfaces";
import bookDefaultImg from "../assets/images/books.png";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const PrevReadingItem = (props: {
  readingData: PrevReadingListProps | undefined;
}) => {
  const navigate = useNavigate();

  const items = props.readingData?.prevReadings.map((rr, i) => {
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
        >
          <Image
            borderRadius="full"
            boxSize="100px"
            boxShadow="md"
            mt="1rem"
            _hover={{ cursor: "pointer" }}
            onClick={() => {
              navigate(
                `/bookdetails/${props.readingData?.prevBooks[i].isbn13}`
              );
            }}
            src={props.readingData?.prevBooks[i].image}
            onError={(e: any) => {
              e.target.onError = null;
              e.target.src = bookDefaultImg;
            }}
            alt="Image"
          />
          <Box w="80%" pl="3rem" mt="1rem">
            <Box display="flex" fontSize="xl" textColor="white">
              <Text align="left">{props.readingData?.prevBooks[i].title}</Text>
            </Box>

            <Box display="flex" fontSize="md" mb="2" textColor="brand.300">
              {props.readingData?.prevBooks[i].authors.join("«»")}
            </Box>
            <Box
              display="flex"
              sx={{ borderBottom: "0.2rem solid #FF9C27" }}
              w="100%"
            />
            <Box display="flex" fontSize="md" textColor="white">
              <Text align="left">{rr.isMyCopy ? "Owned" : "Borrowed"}</Text>
            </Box>
            <Box display="flex" fontSize="md" textColor="white">
              <Text align="left">
                {rr.startTime && rr.endTime
                  ? `Read in ${new Date(rr.endTime).getFullYear()} took ${
                      Math.round(
                        ((new Date(rr.endTime).getTime() -
                          new Date(rr.startTime).getTime()) /
                          (1000 * 3600 * 24)) *
                          100
                      ) / 100
                    } days`
                  : ""}
              </Text>
            </Box>
            <Flex className="prevReadingEditButton" justifyContent="right">
              <Flex
                _hover={{ cursor: "pointer" }}
                id="detail_btn_margin"
                onClick={() => {
                  navigate(`/readingrecord/${rr.bookId}`);
                }}
                borderRadius="full"
                boxSize="70px"
                bg="brand.200"
                boxShadow="md"
                justifyContent="center"
              >
                <Icon as={FiEdit} w={6} h={6} mt="23px" color="white" />
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Box>
    );
  });
  return <Box>{items}</Box>;
};

export default PrevReadingItem;
