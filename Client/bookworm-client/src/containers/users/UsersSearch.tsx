import {
  Box,
  Image,
  Flex,
  Container,
  Text,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiRename } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdOutlineOpenInNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import bookDefaultImg from "../../assets/images/books.png";

import whiteLogo from "../../assets/images/white_book.png";
import whiteLogoRight from "../../assets/images/white_book_right.png";
import SubjectChip from "../../components/SubjectChip";
import { UnauthorizedError, UserResultData } from "../../helpers/interfaces";
import { isAuthenticated } from "../../services/AuthenticationService";
import { getUserByNameOrEmail } from "../../services/UserService";
const UsersSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState<UserResultData[]>([]);
  const navigate = useNavigate();
  const onClickSearch = async () => {
    const result = await getUserByNameOrEmail(searchValue).catch(
      async (error: UnauthorizedError) => {
        if (!(await isAuthenticated())) navigate("/login");
      }
    );
    if (result) {
      console.log(result);
      setUsers(result);
    }
  };

  const results = users.map((user, i) => {
    const currentLikes = user.likes?.map((subject, i) => {
      return <SubjectChip key={`key_${i}`} subject={subject} />;
    });
    return (
      <Box key={`${i}_user_elem`} textColor="white" textAlign="left" m="2rem">
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
            src={
              user.profileImgUrl == null ? bookDefaultImg : user.profileImgUrl
            }
            onError={(e: any) => {
              e.target.onError = null;
              e.target.src = bookDefaultImg;
            }}
            alt="Image"
          />
          <Box w="80%" pl="3rem" mt="1rem">
            <Box display="flex" fontSize="xl" textColor="white">
              <Text align="left">{user.displayName}</Text>
            </Box>
            <Box display="flex" fontSize="md" mb="2" textColor="brand.300">
              {user.email}
            </Box>
            <Box
              display="flex"
              sx={{ borderBottom: "0.2rem solid #FF9C27" }}
              w="100%"
            />
            <Box display="flex" fontSize="md" mb="2" textColor="brand.300">
              {user.description}
            </Box>
            <Box display="flex" fontSize="md" textColor="white">
              {currentLikes}
            </Box>
            <Flex className="prevReadingEditButton" justifyContent="right">
              <Flex
                _hover={{ cursor: "pointer" }}
                id="detail_btn_margin"
                onClick={() => {
                  navigate(`/users/${user.userId}`);
                }}
                borderRadius="full"
                boxSize="70px"
                bg="brand.200"
                boxShadow="md"
                justifyContent="center"
              >
                <Icon
                  as={MdOutlineOpenInNew}
                  w={6}
                  h={6}
                  mt="23px"
                  color="white"
                />
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Box>
    );
  });

  return (
    <Box>
      <Flex zIndex={10} minH="10rem" backgroundColor="brand.100">
        <Image
          className="removeMobile"
          borderRadius="10px"
          w="15rem"
          zIndex={11}
          h="15rem"
          position="absolute"
          mt="-5px"
          opacity="75%"
          src={whiteLogo}
          alt="Bookworm"
        />
        <Image
          className="removeMobile"
          borderRadius="10px"
          w="13rem"
          h="13rem"
          zIndex={11}
          right="0"
          position="absolute"
          mt="-75px"
          opacity="75%"
          src={whiteLogoRight}
          alt="Bookworm"
        />
      </Flex>
      <Container
        minW="50%"
        p="3rem"
        mt="-5rem"
        zIndex={20}
        position="relative"
        backgroundColor="white"
        boxShadow="xl"
        borderRadius="xl"
      >
        <Container fontSize="3xl" textColor="brand.300" w="100%">
          Find a user
        </Container>
        <Container
          minH="5px"
          w="75%"
          mb="1.5rem"
          className="removeMobile"
          borderBottom="0.2rem solid"
          borderColor="brand.300"
        ></Container>
        <Flex justifyContent="center" mt="1.5rem">
          <Input
            placeholder="You can search for name and email..."
            textColor="white"
            borderRadius="full"
            w="70%"
            borderColor="brand.100"
            borderWidth="3px"
            bg="brand.100"
            id="bookSearch"
            size="md"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Flex
            className="main-search-button"
            ml="-25px"
            mt="-10.5px"
            zIndex={1}
            borderRadius="full"
            boxSize="60px"
            bg="brand.100"
            boxShadow="md"
            justifyContent="center"
            onClick={onClickSearch}
          >
            <Icon as={FaSearch} w={7} h={7} mt="15px" color="white" />
          </Flex>
        </Flex>
      </Container>
      <Box w="100%" my="2rem">
        <Text fontSize="3xl">Results</Text>
      </Box>
      <Container minW="80%">{results}</Container>
    </Box>
  );
};

export default UsersSearch;
