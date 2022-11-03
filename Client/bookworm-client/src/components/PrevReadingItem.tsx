import { Box, Flex, Image, Text, Icon } from "@chakra-ui/react";

import React from "react";
import { PrevReadingListProps } from "../helpers/interfaces";
import bookDefaultImg from "../assets/images/books.png";
import { FiEdit } from "react-icons/fi";

const PrevReadingItem = (props: {
  readingData: PrevReadingListProps | undefined;
}) => {
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
                  ? `Read in ${rr.endTime} took ${rr.endTime} days`
                  : ""}
              </Text>
            </Box>
            <Flex justifyContent="right">
              <Flex
                id="detail_btn_margin"
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
