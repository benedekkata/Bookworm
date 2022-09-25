import {
  Box,
  Text,
  Container,
  Flex,
  Icon,
  Editable,
  EditablePreview,
  EditableTextarea,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  Tooltip,
  SliderThumb,
  Textarea,
  Button,
  Spacer,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import { FaUserCircle } from "react-icons/fa";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  editReview,
  getReviews,
  removeReviewDb,
  sendReview,
} from "../services/ReviewService";
import { useParams } from "react-router-dom";
import { Review } from "../helpers/interfaces";

const ReviewItem = (props: {
  key: string;
  review: Review;
  modify: Function;
  edit: Function;
}) => {
  var stars = [];
  const { isbn } = useParams();
  const normalizedPoints: number =
    Math.abs(props.review.stars) > 5 ? 5 : Math.abs(props.review.stars);

  for (let i = 0; i < normalizedPoints; i++) {
    stars.push(<Icon key={i + "filled"} w={5} h={5} as={AiFillStar}></Icon>);
  }
  for (let i = 0; i < 5 - normalizedPoints; i++) {
    stars.push(<Icon w={5} key={i + "empty"} h={5} as={AiOutlineStar}></Icon>);
  }
  const uid: string = localStorage.getItem("userId") || "";

  const removeReview = async () => {
    const success = await removeReviewDb(props.review.id);
    if (success) {
      props.modify(await getReviews(isbn));
    }
  };

  const actionButtons =
    uid === props.review.userId ? (
      <React.Fragment>
        <Button
          onClick={() => props.edit(props.review)}
          leftIcon={<AiOutlineEdit />}
        >
          Edit
        </Button>
        <Button
          leftIcon={<AiOutlineDelete />}
          onClick={removeReview}
          colorScheme="red"
          variant="solid"
          ml="1rem"
        >
          Delete
        </Button>
      </React.Fragment>
    ) : null;

  return (
    <Container
      maxW="container.lg"
      mb="5"
      p="2rem"
      borderColor="brand.100"
      borderWidth="3px"
      borderRadius="3xl"
      boxShadow="md"
      minHeight="10rem"
    >
      <Flex>
        <Box>
          <Icon w={8} h={8} as={FaUserCircle}></Icon>
        </Box>
        <Box pl="1rem" fontSize="xl" fontWeight="bold">
          <Text>{props.review.userId}</Text>
        </Box>
      </Flex>
      <Box borderBottom="0.2rem solid" borderColor="brand.100" w="50%" />
      <Flex my="3" textColor="brand.200">
        {stars}
      </Flex>
      <Flex mt="2rem" textAlign="left" maxW="container.lg">
        <Text>{props.review.comment}</Text>
      </Flex>
      <Flex mt="2rem">{actionButtons}</Flex>
    </Container>
  );
};

const BookReview = () => {
  const { isbn } = useParams();
  const [reviews, setReviews] = useState<Review[] | undefined>([]);
  const [sliderValue, setSliderValue] = React.useState(5);
  const formRef = React.useRef<HTMLInputElement>(null);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [textAreaValue, setTextAreaValue] = React.useState("");

  const [isOnEditMode, setIsOnEditMode] = useState(false);
  const [currentReview, setCurrentReview] = useState<Review | null>(null);
  useEffect(() => {
    getReviews(isbn).then(setReviews).catch();
  }, []);

  const modifyReview = async (review: Review) => {
    setIsOnEditMode(true);
    if (formRef.current) {
      formRef.current.scrollIntoView();
    }
    setSliderValue(review.stars);
    setTextAreaValue(review.comment);
    setCurrentReview(review);
  };

  const reviewItems = reviews?.map((r) => (
    <ReviewItem
      key={r.id + "r_item"}
      review={r}
      modify={setReviews}
      edit={modifyReview}
    />
  ));

  const [isLoading, setIsLoading] = useState(false);

  const onReviewSend = async () => {
    setIsLoading(true);
    let success = false;
    if (!isOnEditMode) {
      success = await sendReview(sliderValue, textAreaValue, isbn);
    } else if (currentReview) {
      currentReview.comment = textAreaValue;
      currentReview.stars = sliderValue;
      success = await editReview(currentReview);
    }
    setIsLoading(false);
    setIsOnEditMode(false);
    if (success) {
      setReviews(await getReviews(isbn));
      setTextAreaValue("");
    }
  };

  const cancelEditBtn = isOnEditMode ? (
    <Button
      ml="1rem"
      onClick={() => {
        setIsOnEditMode(false);
        setSliderValue(5);
        setTextAreaValue("");
      }}
    >
      Cancel
    </Button>
  ) : null;

  const reviewForm = (
    <Container
      ref={formRef}
      maxW="container.lg"
      mb="5"
      p="2rem"
      borderColor="brand.100"
      borderWidth="3px"
      borderRadius="3xl"
      boxShadow="md"
      minHeight="10rem"
    >
      <Flex>
        <Box>
          <Icon w={8} h={8} as={FaUserCircle}></Icon>
        </Box>
        <Box pl="1rem" fontSize="xl" fontWeight="bold">
          <Text>Add your review</Text>
        </Box>
      </Flex>
      <Box borderBottom="0.2rem solid" borderColor="brand.100" w="50%" />
      <Container my="2rem" maxW="container.md">
        <Slider
          id="slider"
          value={sliderValue}
          min={1}
          max={5}
          step={1}
          colorScheme="brand.200"
          onChange={(v) => setSliderValue(v)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <SliderMark value={1} mt="3" fontSize="sm">
            1
          </SliderMark>
          <SliderMark value={2} mt="3" fontSize="sm">
            2
          </SliderMark>
          <SliderMark value={3} mt="3" fontSize="sm">
            3
          </SliderMark>
          <SliderMark value={4} mt="3" fontSize="sm">
            4
          </SliderMark>
          <SliderMark value={5} mt="3" fontSize="sm">
            5
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack bg="brand.200" />
          </SliderTrack>
          <Tooltip
            hasArrow
            bg="brand.200"
            color="white"
            placement="top"
            isOpen={showTooltip}
            label={`${sliderValue} star(s)`}
          >
            <SliderThumb boxSize={6}>
              <Box color="brand.200" as={AiFillStar} />
            </SliderThumb>
          </Tooltip>
        </Slider>
      </Container>
      <Flex mt="2rem" textAlign="left" maxW="container.lg">
        <Textarea
          onChange={(e) => setTextAreaValue(e.target.value)}
          value={textAreaValue}
          placeholder="Add your review!"
        />
      </Flex>
      <Flex mt="2rem">
        <Spacer />
        <Button
          variant="solid"
          onClick={onReviewSend}
          bg="brand.100"
          color="white"
        >
          {isOnEditMode ? "Edit" : "Send"}
        </Button>
        {cancelEditBtn}
      </Flex>
    </Container>
  );

  const loadingScreen = (
    <Box mt="2rem" className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Box>
  );

  return (
    <React.Fragment>
      <Box w="100%">
        <Container
          my="2rem"
          maxW="container.lg"
          textColor="white"
          p="1rem"
          bg="brand.100"
          borderRadius="3xl"
          boxShadow="md"
        >
          <Text fontSize="3xl">Reviews</Text>
        </Container>
        {reviewItems}
        <Box>{isLoading ? loadingScreen : reviewForm}</Box>
      </Box>
    </React.Fragment>
  );
};

export default BookReview;
