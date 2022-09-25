import React from "react";
import BookDetail from "../containers/BookDetail";
import BookReview from "../containers/BookReview";

const BookDetailedView = () => {
  return (
    <React.Fragment>
      <BookDetail></BookDetail>
      <BookReview></BookReview>
    </React.Fragment>
  );
};

export default BookDetailedView;
