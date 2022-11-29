import {
  Container,
  Text,
  Stack,
  Input,
  Switch,
  Flex,
  Box,
  Image,
  Button,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiRename } from "react-icons/bi";
import { BsFillImageFill } from "react-icons/bs";
import bookDefaultImg from "../../assets/images/books.png";
import { useNavigate, useParams } from "react-router-dom";
import whiteLogo from "../../assets/images/white_book.png";
import whiteLogoRight from "../../assets/images/white_book_right.png";
import {
  BookData,
  BookShelf,
  UnauthorizedError,
} from "../../helpers/interfaces";
import { isAuthenticated } from "../../services/AuthenticationService";
import {
  getBooksByShelf,
  removeBookFromShelf,
} from "../../services/BookService";
import {
  checkIsMyShelf,
  deleteShelf,
  editShelfService,
  getShelf,
} from "../../services/MyPageDataService";
import { AiOutlineCloseCircle } from "react-icons/ai";

const BookShelfEdit = () => {
  const { shelfId } = useParams();

  const [shelf, setShelf] = useState<BookShelf>();
  const [isMyShelf, setIsMyShelf] = useState<boolean>(false);
  const [books, setBooks] = useState<BookData[]>();

  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [iconURL, setIconURL] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    checkIsMyShelf(shelfId).then(setIsMyShelf);
  }, []);

  useEffect(() => {
    getShelf(shelfId ? shelfId : "").then(setShelf);
    getBooksByShelf(shelfId ? shelfId : "").then(setBooks);
  }, [isMyShelf]);

  useEffect(() => {
    if (shelf) {
      setIsPrivate(shelf?.isPrivate);
      setName(shelf?.name);
      setIconURL(shelf?.iconURL);
    }
  }, [shelf]);

  const onSubmit = async () => {
    if (shelf) {
      const editedShelf = {
        ...shelf,
        isPrivate: isPrivate,
        name: name,
        iconURL: iconURL,
      };
      const isSuccess = await editShelfService(editedShelf).catch(
        async (error: UnauthorizedError) => {
          if (!(await isAuthenticated())) navigate("/login");
        }
      );
      if (isSuccess) {
        navigate("/mypage");
      }
    }
  };

  const onDelete = async () => {
    const isSuccess = await deleteShelf(shelfId).catch(
      async (error: UnauthorizedError) => {
        if (!(await isAuthenticated())) navigate("/login");
      }
    );
    if (isSuccess) {
      navigate("/mypage");
    }
  };

  const removeBook = async (isbn: string) => {
    const isSuccess = await removeBookFromShelf(shelfId, isbn).catch(
      async (error: UnauthorizedError) => {
        if (!(await isAuthenticated())) navigate("/login");
      }
    );
    if (isSuccess) {
      getBooksByShelf(shelfId ? shelfId : "").then(setBooks);
    }
  };

  const items = books?.map((book, i) => {
    return (
      <Box key={`${i}_shelf_elem`} textColor="white" textAlign="left">
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
          {!isMyShelf ? (
            ""
          ) : (
            <Box>
              <Icon
                as={AiOutlineCloseCircle}
                _hover={{ cursor: "pointer" }}
                onClick={() => removeBook(book.isbn13)}
                w={7}
                h={7}
                color="white"
              />
            </Box>
          )}
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
      {!isMyShelf ? (
        ""
      ) : (
        <Container
          minW="75%"
          p="2rem"
          mt="-5rem"
          zIndex={20}
          position="relative"
          color="gray"
          backgroundColor="white"
          boxShadow="xl"
          borderRadius="xl"
        >
          <Stack spacing={5} w="100%">
            <Flex w="100%" justifyContent="center">
              <Text
                textAlign="center"
                color="brand.100"
                fontSize="xl"
                fontWeight="bold"
              >
                Edit shelf here
              </Text>
            </Flex>
            <Flex w="100%" justifyContent="left">
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<BiRename color="gray.300" />}
                />
                <Input
                  borderRadius="2xl"
                  placeholder="Name"
                  borderColor="brand.100"
                  borderWidth="2px"
                  variant="outline"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Input>
              </InputGroup>
            </Flex>

            <Flex w="100%">
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<BsFillImageFill color="gray.300" />}
                />
                <Input
                  borderRadius="2xl"
                  placeholder="IconURL"
                  borderColor="brand.100"
                  borderWidth="2px"
                  variant="outline"
                  value={iconURL}
                  onChange={(e) => setIconURL(e.target.value)}
                ></Input>
              </InputGroup>
            </Flex>
            <Flex w="100%">
              <Text
                textAlign="left"
                ml="0.5rem"
                color="brand.100"
                fontWeight="bold"
                w="16%"
              >
                Is Private?
              </Text>
              <Switch
                pt="2px"
                isChecked={isPrivate}
                colorScheme="cyan"
                onChange={(e) => setIsPrivate(e.target.checked)}
              ></Switch>
            </Flex>
            <Flex justifyContent="end" w="100%">
              <Button
                backgroundColor="brand.100"
                mr={3}
                onClick={onSubmit}
                color="white"
              >
                Save
              </Button>
              <Button
                backgroundColor="brand.300"
                onClick={onDelete}
                color="white"
              >
                Delete Shelf
              </Button>
            </Flex>
          </Stack>
        </Container>
      )}
      <Box w="100%" my="2rem">
        <Text position="relative" zIndex="99" fontSize="3xl">
          Books saved in {shelf?.name}
        </Text>
      </Box>
      <Container minW="80%">{items}</Container>
    </Box>
  );
};
export default BookShelfEdit;
