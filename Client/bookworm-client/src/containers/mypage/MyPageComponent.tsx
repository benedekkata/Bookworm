import {
  Avatar,
  Icon,
  Text,
  Container,
  Flex,
  WrapItem,
  Box,
  Divider,
  Textarea,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CurrentReadingCarusel from "./CurrentReadingCarusel";
import PrevReadingItem from "../../components/PrevReadingItem";
import SubjectChip from "../../components/SubjectChip";
import {
  MyPageData,
  MyPageDataProps,
  UnauthorizedError,
} from "../../helpers/interfaces";
import { isAuthenticated } from "../../services/AuthenticationService";
import {
  getMyPageData,
  saveBioAndPreferedTypes,
} from "../../services/MyPageDataService";
import WishList from "./WishList";

const MyPageComponent = () => {
  const [myPageData, setMyPageData] = useState<MyPageDataProps | undefined>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const refreshState = () => {
    getMyPageData().then(setMyPageData);
  };

  useEffect(() => {
    getMyPageData().then(setMyPageData);
  }, [setMyPageData]);

  const preferedTypes = myPageData?.data?.likes.map((book) => (
    <SubjectChip key={`key_${book}`} subject={book} />
  ));

  const prefTypes = (
    <Box
      display="flex"
      flexWrap="wrap"
      mt="1rem"
      fontSize="md"
      color="brand.300"
    >
      {preferedTypes}
    </Box>
  );

  const navigate = useNavigate();

  const editBioAndPreferedTypes = async () => {
    const isSuccess = await saveBioAndPreferedTypes(
      myPageData?.data.description,
      myPageData?.data.likes.join(";")
    ).catch(async (error: UnauthorizedError) => {
      if (!(await isAuthenticated())) navigate("/login");
    });
    if (isSuccess) {
      onClose();
    }
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newData: MyPageDataProps = {
      ...myPageData,
      data: {
        ...myPageData?.data,
        description: e.target.value,
      },
    } as MyPageDataProps;
    setMyPageData(newData);
  };
  const handlePtChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newData: MyPageDataProps = {
      ...myPageData,
      data: {
        ...myPageData?.data,
        likes: e.target.value.split(";"),
      },
    } as MyPageDataProps;
    setMyPageData(newData);
  };

  return (
    <React.Fragment>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit bio & Prefered types</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Write your bio here:</Text>
            <Textarea
              minH="10rem"
              placeholder="Add your bio here..."
              value={myPageData?.data.description}
              onChange={(e) => handleBioChange(e)}
            />
            <Text mt="1rem">Describe which book types you prefer here: </Text>
            <Textarea
              minH="5rem"
              placeholder="Add your prefered types here separated with ';'..."
              value={myPageData?.data.likes.join(";")}
              onChange={(e) => handlePtChange(e)}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              background="brand.100"
              onClick={editBioAndPreferedTypes}
              color="white"
              mr={2}
            >
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
                : prefTypes}
            </Box>
          </Box>

          <Flex w="10%" justifyContent="right">
            <Flex
              borderRadius="full"
              sx={{ _hover: { cursor: "pointer" } }}
              onClick={onOpen}
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
          refreshState={refreshState}
          data={{
            currentBooks: myPageData?.currentReadingList?.currentBooks || [],
            currentReadings:
              myPageData?.currentReadingList?.currentReadings || [],
          }}
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
                  Wishlist
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
              <WishList wishlistItems={myPageData?.wishlistBooks}></WishList>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Container>
    </React.Fragment>
  );
};

export default MyPageComponent;
