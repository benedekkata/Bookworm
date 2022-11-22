import {
  Avatar,
  Box,
  Container,
  Divider,
  Flex,
  WrapItem,
} from "@chakra-ui/react";
import { MyPageData } from "../../helpers/interfaces";

const UserPage = () => {
  const myPageData: any = undefined;
  const preferedTypes = myPageData?.data?.likes;

  return (
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
      </Flex>
    </Container>
  );
};

export default UserPage;
