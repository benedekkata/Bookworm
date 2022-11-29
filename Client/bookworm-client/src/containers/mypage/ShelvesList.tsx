import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import bookDefaultImg from "../../assets/images/books.png";
import { FiLock } from "react-icons/fi";
import {
  createShelfService,
  getShelves,
} from "../../services/MyPageDataService";
import { BookShelf, UnauthorizedError } from "../../helpers/interfaces";
import { isAuthenticated } from "../../services/AuthenticationService";
import { MdOutlineOpenInNew } from "react-icons/md";

const ShelvesList = (props: { onlyPublic: boolean }) => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [shelves, setShelves] = useState<BookShelf[] | undefined>();
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [iconURL, setIconURL] = useState<string>("");
  useEffect(() => {
    const uid = props.onlyPublic ? userId : undefined;
    getShelves(uid).then(setShelves);
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const createShelf = async () => {
    const newShelf: BookShelf = {
      isWishlist: false,
      isPrivate: isPrivate,
      name: name,
      iconURL: iconURL,
      bookIds: [],
    };
    const isSuccess = await createShelfService(newShelf).catch(
      async (error: UnauthorizedError) => {
        if (!(await isAuthenticated())) navigate("/login");
      }
    );
    if (isSuccess) {
      getShelves().then(setShelves);
      onClose();
      setName("");
      setIconURL("");
      setIsPrivate(false);
    }
  };

  const items = shelves?.map((shelf, i) => {
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
            src={shelf.iconURL}
            onError={(e: any) => {
              e.target.onError = null;
              e.target.src = bookDefaultImg;
            }}
            alt="Image"
          />
          <Box w="80%" pl="3rem" mt="1rem">
            <Box display="flex" fontSize="xl" textColor="white">
              <Text mr={3} align="left">
                {shelf.name}
              </Text>
              {shelf.isPrivate ? <Icon as={FiLock} /> : ""}
            </Box>
            <Box
              display="flex"
              sx={{ borderBottom: "0.2rem solid #FF9C27" }}
              w="100%"
            />
            <Flex className="prevReadingEditButton" justifyContent="right">
              <Flex
                _hover={{ cursor: "pointer" }}
                id="detail_btn_margin"
                onClick={() => {
                  navigate(`/shelf/${shelf.id}`);
                }}
                borderRadius="full"
                boxSize="70px"
                bg="brand.200"
                boxShadow="md"
                justifyContent="center"
                mt="2.5rem"
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Shelf</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Text>Name:</Text>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Input>
              <Text>Is Private?</Text>
              <Switch
                isChecked={isPrivate}
                colorScheme="cyan"
                onChange={(e) => setIsPrivate(e.target.checked)}
              ></Switch>
              <Text>IconURL:</Text>
              <Input
                value={iconURL}
                onChange={(e) => setIconURL(e.target.value)}
              ></Input>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              background="brand.100"
              onClick={createShelf}
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
      {items}
      {props.onlyPublic ? (
        ""
      ) : (
        <Flex justifyContent="end">
          <Button
            color="white"
            onClick={() => {
              console.log(isOpen);
              onOpen();
            }}
            background="brand.200"
          >
            Create
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default ShelvesList;
