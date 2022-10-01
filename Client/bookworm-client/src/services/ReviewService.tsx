import { API_REVIEW } from "../helpers/constants";
import { Review } from "../helpers/interfaces";
import { UnauthorizedError } from "../helpers/utils";

export const sendReview = async (
  stars: number,
  comment: string,
  isbn: string = ""
): Promise<boolean> => {
  const uid: string = localStorage.getItem("userId") || "";
  const newReview: Review = {
    comment: comment,
    stars: stars,
    userId: uid,
    bookIsbn: isbn,
    id: 0,
    bookId: "",
  };

  const token: string | null = localStorage.getItem("token");
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(newReview),
  };

  const res = await fetch(`${API_REVIEW}/new`, requestOptions).catch();
  if (res.status === 200) {
    return true;
  }
  if (res.status === 401) {
    throw new UnauthorizedError("You have to be logged in to use this.");
  }
  return false;
};

export const getReviews = async (
  isbn: string = ""
): Promise<Review[] | undefined> => {
  const token: string | null = localStorage.getItem("token");

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  const response: Response = await fetch(
    `${API_REVIEW}?isbn=${isbn}`,
    requestOptions
  );
  if (response.status === 200) {
    const res: Review[] = await response.json();
    return res;
  }
  if (response.status === 401) {
    throw new UnauthorizedError("You have to be logged in to use this.");
  }

  return undefined;
};

export const removeReviewDb = async (id: number): Promise<boolean> => {
  const token: string | null = localStorage.getItem("token");

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  const response: Response = await fetch(
    `${API_REVIEW}/remove?id=${id}`,
    requestOptions
  ).catch();

  if (response.status === 200) {
    return true;
  }
  if (response.status === 401) {
    throw new UnauthorizedError("You have to be logged in to use this.");
  }
  return false;
};

export const editReview = async (review: Review | null): Promise<boolean> => {
  const token: string | null = localStorage.getItem("token");
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(review),
  };

  const res = await fetch(`${API_REVIEW}/edit`, requestOptions).catch();
  if (res.status === 200) {
    return true;
  }
  if (res.status === 401) {
    throw new UnauthorizedError("You have to be logged in to use this.");
  }
  return false;
};
