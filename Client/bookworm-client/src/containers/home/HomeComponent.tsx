import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Flex,
  Icon,
  Input,
  Image,
  Text,
  Checkbox,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
  MenuGroup,
} from "@chakra-ui/react";
import SearchResult from "../../components/SearchResult";
import { FaSearch, FaSort } from "react-icons/fa";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import whiteLogo from "../../assets/images/white_book.png";
import whiteLogoRight from "../../assets/images/white_book_right.png";
import { BookData, SearchDetails } from "../../helpers/interfaces";
import {
  getBookList,
  readSearchDetails,
  saveSearchDetails,
} from "../../services/BookService";
import Loading from "../../layouts/Loading";
import { UnauthorizedError } from "../../helpers/utils";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../services/AuthenticationService";
import { MdFilterListAlt } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { datePcikerConfig } from "../../config/GeneralConfig";

const Home = () => {
  //states
  const startData: SearchDetails = readSearchDetails();

  const [bookResultList, setBookResultList] = useState<BookData[]>(
    startData.bookList
  );
  const [searchValue, setSearchValue] = useState(startData.searchValue);
  const [isLoading, setIsLoading] = useState(false);
  const [pdStart, setPdStart] = useState<Date | undefined>(startData.minYear);
  const [pdEnd, setPdEnd] = useState<Date | undefined>(startData.maxYear);
  const [order, setOrder] = useState(startData.order);
  const [onlyReview, setOnlyReview] = React.useState(startData.onlyReview);
  const [isFilterApplied, setIsFilterApplied] = useState<boolean>(
    startData.maxYear || startData.minYear ? true : false
  );
  const [page, setPage] = useState<number>(startData.page);
  const [maxPage, setMaxPage] = useState<number>(0);

  const navigate = useNavigate();

  const onClickSearch = async () => {
    setIsLoading(true);
    let list = await getBookList(
      searchValue,
      pdStart,
      pdEnd,
      onlyReview,
      order,
      page
    ).catch(async (error: UnauthorizedError) => {
      if (!(await isAuthenticated())) navigate("/login");
    });
    setBookResultList(list?.books || []);
    setMaxPage(list?.total || 0);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log("called");
    onClickSearch();
  }, [isFilterApplied, onlyReview, order, page]);

  useEffect(() => {
    saveSearchDetails({
      bookList: bookResultList,
      searchValue: searchValue,
      maxYear: pdEnd,
      minYear: pdStart,
      order: order,
      onlyReview: onlyReview,
      page: page,
    });
  }, [onClickSearch]);

  let buttons = [];
  for (let i = 0; i < maxPage; i++) {
    buttons.push(
      <Button
        mr={2}
        onClick={() => setPage(i)}
        key={`paginator_${i}`}
        backgroundColor={i === page ? "brand.100" : ""}
      >
        {i + 1}
      </Button>
    );
  }

  const leftPaginatorIcon =
    page !== 0 ? (
      <Icon
        sx={{ _hover: { cursor: "pointer" } }}
        color="brand.100"
        mr={2}
        as={AiOutlineArrowLeft}
        w={7}
        h={7}
        onClick={() => setPage(page - 1)}
      ></Icon>
    ) : null;

  const rightPaginatorIcon =
    page !== maxPage - 1 ? (
      <Icon
        sx={{ _hover: { cursor: "pointer" } }}
        color="brand.100"
        ml={2}
        as={AiOutlineArrowRight}
        w={7}
        h={7}
        onClick={() => setPage(page + 1)}
      ></Icon>
    ) : null;

  const paginator =
    bookResultList.length !== 0 ? (
      <Container mb={5}>
        <Flex alignContent="center" justifyContent="center" alignItems="center">
          {leftPaginatorIcon}
          {buttons}
          {rightPaginatorIcon}
        </Flex>
      </Container>
    ) : null;

  const searchRes = (
    <React.Fragment>
      <Box w="100%">
        <Box w="100%" my="5">
          <Text fontSize="3xl">Results</Text>
        </Box>
        <Container maxW="container.lg">
          <Flex justifyContent="right">
            <Menu closeOnSelect={false}>
              <MenuButton
                leftIcon={<FaSort />}
                mr={2}
                color="brand.100"
                as={Button}
              >
                Sort
              </MenuButton>
              <MenuList minWidth="240px">
                <MenuOptionGroup title="ABC" value={order} type="radio">
                  <MenuItemOption
                    onClick={() => setOrder("abc_asc")}
                    value="abc_asc"
                  >
                    <Icon as={BiSortUp} w={5} h={5} mr={3} pt={1.3} />
                    Ascending
                  </MenuItemOption>
                  <MenuItemOption
                    onClick={() => setOrder("abc_desc")}
                    value="abc_desc"
                  >
                    <Icon as={BiSortDown} w={5} h={5} mr={3} pt={1.3} />
                    Descending
                  </MenuItemOption>
                </MenuOptionGroup>
                <MenuDivider />
                <MenuOptionGroup
                  title="Publish Date"
                  value={order}
                  type="radio"
                >
                  <MenuItemOption
                    onClick={() => setOrder("pd_asc")}
                    value="pd_asc"
                  >
                    <Icon as={BiSortUp} w={5} h={5} mr={3} pt={1.3} />
                    Ascending
                  </MenuItemOption>
                  <MenuItemOption
                    onClick={() => setOrder("pd_desc")}
                    value="pd_desc"
                  >
                    <Icon as={BiSortDown} w={5} h={5} mr={3} pt={1.3} />
                    Descending
                  </MenuItemOption>
                </MenuOptionGroup>
                <MenuDivider />
                <MenuOptionGroup title="ISBN" value={order} type="radio">
                  <MenuItemOption
                    onClick={() => setOrder("isbn_asc")}
                    value="isbn_asc"
                  >
                    <Icon as={BiSortUp} w={5} h={5} mr={3} pt={1.3} />
                    Ascending
                  </MenuItemOption>
                  <MenuItemOption
                    onClick={() => setOrder("isbn_desc")}
                    value="isbn_desc"
                  >
                    <Icon as={BiSortDown} w={5} h={5} mr={3} pt={1.3} />
                    Descending
                  </MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                leftIcon={<MdFilterListAlt />}
                mr={2}
                color={isFilterApplied ? "white" : "brand.100"}
                bgColor={isFilterApplied ? "brand.100" : "grey.100"}
                as={Button}
              >
                Filter
              </MenuButton>
              <MenuList minWidth="240px">
                <MenuGroup title="Publish Date">
                  <Box px={2} maxW="350px">
                    Min:
                    <SingleDatepicker
                      name="date-input"
                      date={pdStart}
                      onDateChange={setPdStart}
                      propsConfigs={datePcikerConfig}
                    />
                    Max:
                    <SingleDatepicker
                      name="date-input"
                      date={pdEnd}
                      onDateChange={setPdEnd}
                      propsConfigs={datePcikerConfig}
                    />
                    <Button
                      variant="solid"
                      mt="1rem"
                      onClick={() => {
                        setIsFilterApplied(true);
                        onClickSearch();
                      }}
                      mr={1}
                    >
                      Submit
                    </Button>
                    <Button
                      leftIcon={<AiOutlineDelete />}
                      colorScheme="red"
                      variant="solid"
                      onClick={() => {
                        setIsFilterApplied(false);
                        setPdStart(undefined);
                        setPdEnd(undefined);
                      }}
                      mt="1rem"
                    >
                      Clear
                    </Button>
                  </Box>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Flex>
        </Container>
        <SearchResult list={bookResultList} />
      </Box>
      {paginator}
    </React.Fragment>
  );

  const reviewCheckox = (
    <Container textColor="white">
      <Checkbox
        isChecked={onlyReview}
        onChange={(e) => setOnlyReview(e.target.checked)}
      >
        Only show reviewed by me
      </Checkbox>
    </Container>
  );

  return (
    <React.Fragment>
      <Box bg="brand.200" height="200px">
        <Image
          className="removeMobile"
          borderRadius="10px"
          w="15rem"
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
          right="0"
          position="absolute"
          mt="-75px"
          opacity="75%"
          src={whiteLogoRight}
          alt="Bookworm"
        />
        <Container fontSize="3xl" textColor="white" pt="1rem" w="100%">
          Find a book
        </Container>
        <Container
          minH="5px"
          w="75%"
          mb="1.5rem"
          className="removeMobile"
          sx={{ borderBottom: "0.2rem solid white" }}
        ></Container>
        <Flex justifyContent="center" mt="1.5rem">
          <Input
            placeholder="You can search for title and author..."
            textColor="white"
            borderRadius="full"
            w="50%"
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
        {reviewCheckox}
      </Box>
      <Box>{isLoading ? <Loading /> : searchRes}</Box>
    </React.Fragment>
  );
};

export default Home;
