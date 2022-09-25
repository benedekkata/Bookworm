import React from "react";
import BookDetail from "../components/BookDetail";
import BookReview from "../containers/BookReview";
import { BookData } from "../helpers/interfaces";

const BookDetailedView = (props: { data: BookData }) => {
  return (
    <React.Fragment>
      <BookDetail book={props.data}></BookDetail>
      <BookReview></BookReview>
    </React.Fragment>
  );
};

export default BookDetailedView;
