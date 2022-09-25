import React from "react";
import BookDetail from "../containers/BookDetail";
import BookReview from "../containers/BookReview";
import { ReviewData } from "../helpers/interfaces";

const BookDetailedView = () => {
  return (
    <React.Fragment>
      <BookDetail></BookDetail>
      <BookReview></BookReview>
    </React.Fragment>
  );
};

export default BookDetailedView;
