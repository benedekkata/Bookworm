import React from "react";
import BookDetail from "../components/BookDetail";
import BookReview from "../components/BookReview";
import { BookDetails } from "../helpers/interfaces";

const BookDetailedView = (props: { data: BookDetails }) => {
  return (
    <React.Fragment>
      <BookDetail book={props.data.book}></BookDetail>
      <BookReview reviews={props.data.reviews}></BookReview>
    </React.Fragment>
  );
};

export default BookDetailedView;
