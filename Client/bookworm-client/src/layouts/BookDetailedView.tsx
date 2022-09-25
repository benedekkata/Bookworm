import React from "react";
import BookReview from "../containers/BookReview";
import BookDetail from "../containers/BookDetail";

const BookDetailedView = () => {
  return (
    <React.Fragment>
      <BookDetail></BookDetail>
      <BookReview></BookReview>
    </React.Fragment>
  );
};

export default BookDetailedView;
