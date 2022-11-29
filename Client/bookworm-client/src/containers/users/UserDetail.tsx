import {
  Avatar,
  Box,
  Text,
  Container,
  Divider,
  Flex,
  WrapItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SubjectChip from "../../components/SubjectChip";
import { BookData, UserDetailPublic } from "../../helpers/interfaces";
import { getWishListItems } from "../../services/MyPageDataService";
import { getUserDetailPublic } from "../../services/UserService";
import ShelvesList from "../mypage/ShelvesList";
import WishList from "../mypage/WishList";

const UserDetail = () => {
  const { userId } = useParams();
  const [userDataPublic, setUserDataPublic] = useState<UserDetailPublic>();
  const [wishlistItems, setWishlistItems] = useState<BookData[]>();

  useEffect(() => {
    getUserDetailPublic(userId).then(setUserDataPublic);
  }, []);

  useEffect(() => {
    getWishListItems(userDataPublic?.bookShelves).then(setWishlistItems);
  }, [userDataPublic]);

  const preferedTypes = userDataPublic?.data?.likes?.map((book) => (
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
              name={userDataPublic?.data?.displayName}
              src={userDataPublic?.data?.profileImgUrl}
            />{" "}
          </WrapItem>
          <Box w="75%" textColor="white" textAlign="left" ml="3rem">
            <Box fontSize="2xl">{userDataPublic?.data?.displayName}</Box>
            <Divider />
            <Box>
              {userDataPublic?.data?.description || "No information available"}
            </Box>
            <Divider />
            <Box>
              {userDataPublic?.data?.likes?.length === 0
                ? "No information available"
                : prefTypes}
            </Box>
          </Box>
        </Flex>
      </Container>
      <Container my="3rem" minW="80%">
        <Accordion allowToggle>
          <AccordionItem>
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
              <AccordionIcon color="white" />
            </AccordionButton>
            <AccordionPanel
              mt="1rem"
              py={3}
              borderRadius="xl"
              border="2px solid"
              borderColor="brand.100"
            >
              <WishList
                readOnly={true}
                wishlistItems={wishlistItems}
                refreshState={() => {}}
              ></WishList>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Container>
      <Container my="3rem" minW="80%">
        <Accordion allowToggle>
          <AccordionItem>
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
                Shelves
              </Box>
              <AccordionIcon color="white" />
            </AccordionButton>
            <AccordionPanel
              mt="1rem"
              py={3}
              borderRadius="xl"
              border="2px solid"
              borderColor="brand.100"
            >
              <ShelvesList onlyPublic={true}></ShelvesList>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Container>
    </React.Fragment>
  );
};

export default UserDetail;
