import React from "react";
import BookReview from "../components/BookReview";
import BookDetail from "../containers/BookDetail";
import { ReviewData } from "../helpers/interfaces";
const sampleReviews: ReviewData[] = [
  {
    _id: "review1",
    author: "Cherie Morgan",
    text: "The box this comes in is 4 meter by 5 foot and weights 18 kilogram.I saw one of these in Haiti and I bought one.My velociraptor loves to play with it.",
    author_id: "user1",
    points: 5,
  },
  {
    _id: "review2",
    author: "Dilara Hayes",
    text: "My neighbor Elisha has one of these. She works as a fortune teller and she says it looks floppy.The box this comes in is 3 kilometer by 5 foot and weights 16 megaton!!!",
    author_id: "user2",
    points: 1,
  },
  {
    _id: "review3",
    author: "Reema Arias",
    text: "Heard about this on dance-rock radio, decided to give it a try. i use it for 10 weeks when i'm in my sauna.",
    author_id: "user3",
    points: 3,
  },
];
const BookDetailedView = () => {
  return (
    <React.Fragment>
      <BookDetail></BookDetail>
      <BookReview reviews={sampleReviews}></BookReview>
    </React.Fragment>
  );
};

export default BookDetailedView;
