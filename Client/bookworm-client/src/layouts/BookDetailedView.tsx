import React from "react";
import BookDetail from "../containers/home/BookDetail";
import BookReview from "../containers/home/BookReview";

const BookDetailedView = () => {
  return (
    <React.Fragment>
      <BookDetail></BookDetail>
      <BookReview></BookReview>
    </React.Fragment>
  );
};

export default BookDetailedView;
