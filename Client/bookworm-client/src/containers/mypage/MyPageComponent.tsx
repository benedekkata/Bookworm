import {
  Button,
  Image,
  Avatar,
  Icon,
  Text,
  Container,
  Flex,
  WrapItem,
  Box,
  Divider,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import CurrentReadingCarusel from "../../components/CurrentReadingCarusel";
import PrevReadingItem from "../../components/PrevReadingItem";
import { MyPageDataProps } from "../../helpers/interfaces";
import { getMyPageData } from "../../services/MyPageDataService";

const MyPageComponent = () => {
  const [myPageData, setMyPageData] = useState<MyPageDataProps | undefined>();
  useEffect(() => {
    getMyPageData().then(setMyPageData);
  }, [setMyPageData]);

  const preferedTypes = myPageData?.data?.likes;

  return (
    <React.Fragment>
      <Container
        minW="75%"
        p="2rem"
        mt="2rem"
        backgroundColor="brand.100"
        boxShadow="xl"
        borderRadius="xl"
      >
        <Flex>
          <WrapItem w="15%">
            <Avatar
              size="2xl"
              boxShadow="xl"
              name={myPageData?.data?.displayName}
              src={myPageData?.data?.img}
            />{" "}
          </WrapItem>
          <Box w="75%" textColor="white" textAlign="left" ml="3rem">
            <Box fontSize="2xl">{myPageData?.data?.displayName}</Box>
            <Divider />
            <Box>
              {myPageData?.data?.description ||
                "Click on Edit to add or edit your bio text"}
            </Box>
            <Divider />
            <Box>
              {myPageData?.data?.likes.length === 0
                ? "Click on Edit to select your prefered book types"
                : preferedTypes}
            </Box>
          </Box>

          <Flex w="10%" justifyContent="right">
            <Flex
              borderRadius="full"
              boxSize="50px"
              bg="brand.200"
              boxShadow="md"
              justifyContent="center"
              marginTop="auto"
              marginBottom="-1rem"
              marginRight="-1rem"
            >
              <Icon as={FiEdit} w={6} h={6} mt="0.7rem" color="white" />
            </Flex>
          </Flex>
        </Flex>
      </Container>
      <Box w="100%" my="2rem">
        <Text fontSize="3xl">Currently Reading</Text>
      </Box>
      <Box>
        <CurrentReadingCarusel
          currentBooks={myPageData?.currentReadingList?.currentBooks || []}
          currentReadings={
            myPageData?.currentReadingList?.currentReadings || []
          }
        ></CurrentReadingCarusel>
      </Box>
      <Container my="3rem" minW="75%">
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton
                backgroundColor="brand.100"
                borderRadius="xl"
                sx={{ _hover: { cursor: "pointer" } }}
              >
                <Box
                  flex="1"
                  textAlign="center"
                  textColor="white"
                  fontSize="3xl"
                  backgroundColor="brand.100"
                >
                  Previous Readings
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel
              pb={4}
              mt="1rem"
              borderRadius="xl"
              border="2px solid"
              borderColor="brand.100"
            >
              <PrevReadingItem
                readingData={myPageData?.prevReadingList}
              ></PrevReadingItem>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Container>
    </React.Fragment>
  );
};

export default MyPageComponent;
