import { maxTime, minTime } from "date-fns";
import { API_BOOK } from "../helpers/constants";
import {
  BookData,
  PaginatedBookData,
  SearchDetails,
} from "../helpers/interfaces";
import { BadRequestError, UnauthorizedError } from "../helpers/utils";

export const getBookList = async (
  query: string,
  minYear?: Date,
  maxYear?: Date,
  onlyReview?: boolean,
  order?: String,
  page: number = 0
): Promise<PaginatedBookData> => {
  const token: string | null = localStorage.getItem("token");
  let res: PaginatedBookData = {
    currentPage: 0,
    itemPerPage: 10,
    total: 1,
    books: [],
  };
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  const minY = minYear ? `&minYear=${minYear.getFullYear()}` : "";
  const maxY = maxYear ? `&maxYear=${maxYear.getFullYear()}` : "";
  const onlyR = onlyReview ? `&onlyReview=${onlyReview}` : "";
  const uid = localStorage.getItem("userId");
  const uidParam = uid ? `&uid=${uid}` : "";
  const orderParam = order ? `&order=${order}` : "";
  const response: Response = await fetch(
    `${API_BOOK}?searchQuery=${encodeURIComponent(
      query
    )}&page=${page}${minY}${maxY}${onlyR}${uidParam}${orderParam}`,
    requestOptions
  );
  if (response.status === 200) {
    res = await response.json();
  }
  if (response.status === 401) {
    throw new UnauthorizedError("You have to be logged in to use this.");
  }
  return res;
};

export const getBookByIsbn = async (
  isbn: string
): Promise<BookData | undefined> => {
  const token: string | null = localStorage.getItem("token");

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  const response: Response = await fetch(
    `${API_BOOK}/details?isbn=${isbn}`,
    requestOptions
  );
  if (response.status === 200) {
    const res: BookData = await response.json();
    return res;
  }
  if (response.status === 401) {
    throw new UnauthorizedError("You have to be logged in to use this.");
  }
};

export const getBooksByShelf = async (
  shelfId: string
): Promise<BookData[] | undefined> => {
  const token: string | null = localStorage.getItem("token");

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  const response: Response = await fetch(
    `${API_BOOK}/shelf/${shelfId}`,
    requestOptions
  );
  if (response.status === 200) {
    const res: BookData[] = await response.json();
    return res;
  }
  if (response.status === 401) {
    throw new UnauthorizedError("You have to be logged in to use this.");
  }
};

export const getBookById = async (
  id: string
): Promise<BookData | undefined> => {
  const token: string | null = localStorage.getItem("token");

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  const response: Response = await fetch(`${API_BOOK}/${id}`, requestOptions);
  if (response.status === 200) {
    const res: BookData = await response.json();
    return res;
  }
  if (response.status === 401) {
    throw new UnauthorizedError("You have to be logged in to use this.");
  }
};

export const getBookRatingById = async (
  id: string
): Promise<number | undefined> => {
  const token: string | null = localStorage.getItem("token");

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  const response: Response = await fetch(
    `${API_BOOK}/rating/${id}`,
    requestOptions
  );
  if (response.status === 200) {
    const res: number = await response.json();
    return res;
  }
  if (response.status === 401) {
    throw new UnauthorizedError("You have to be logged in to use this.");
  }
};

export const removeBookFromShelf = async (
  shelfId: string | undefined,
  isbn: string | undefined
): Promise<boolean> => {
  const token: string | null = localStorage.getItem("token");

  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  const response: Response = await fetch(
    `${API_BOOK}/shelf/${shelfId}?isbn=${isbn}`,
    requestOptions
  );
  if (response.status === 204) {
    return true;
  }
  if (response.status === 401) {
    throw new UnauthorizedError("You have to be logged in to use this.");
  }
  if (response.status === 400) {
    const msg = await response.text();
    throw new BadRequestError(msg);
  }

  return false;
};

export const saveSearchDetails = (data: SearchDetails) => {
  localStorage.setItem("bookList", JSON.stringify(data.bookList));
  localStorage.setItem("searchValue", data.searchValue);
  localStorage.setItem("maxYear", data?.maxYear?.toDateString() || "");
  localStorage.setItem("minYear", data?.minYear?.toDateString() || "");
  localStorage.setItem("order", data?.order || "");
  localStorage.setItem("onlyReview", JSON.stringify(data?.onlyReview));
  localStorage.setItem("page", JSON.stringify(data.page));
};

export const readSearchDetails = (): SearchDetails => {
  const bookList = localStorage.getItem("bookList");
  const searchValue = localStorage.getItem("searchValue");
  const maxYear = localStorage.getItem("maxYear");
  const minYear = localStorage.getItem("minYear");
  const order = localStorage.getItem("order");
  const finalOrder = order !== null ? order : "abc_asd";
  const onlyReview = localStorage.getItem("onlyReview");
  const page = localStorage.getItem("page");

  return {
    bookList: bookList ? JSON.parse(bookList) : [],
    searchValue: searchValue ? searchValue : "",
    page: page ? JSON.parse(page) : 0,
    order: finalOrder,
    onlyReview: onlyReview ? JSON.parse(onlyReview) : false,
    maxYear: maxYear && maxYear !== "undefined" ? new Date(maxYear) : undefined,
    minYear: minYear && minYear !== "undefined" ? new Date(minYear) : undefined,
  };
};
