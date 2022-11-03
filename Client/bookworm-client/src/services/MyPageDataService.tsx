import React from "react";
import { API_USERAPPDATA } from "../helpers/constants";
import {
  BookData,
  MyPageData,
  MyPageDataProps,
  ReadingRecord,
} from "../helpers/interfaces";
import { UnauthorizedError } from "../helpers/utils";
import { getBookById } from "./BookService";

export const getMyPageData = async (): Promise<MyPageDataProps | undefined> => {
  const token: string | null = localStorage.getItem("token");
  const uid: string | null = localStorage.getItem("userId");

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  const response: Response = await fetch(
    `${API_USERAPPDATA}/${uid}`,
    requestOptions
  );
  if (response.status === 200) {
    const res: MyPageData = await response.json();
    const currentReadings = res.readings.filter(
      (rr) => rr.isCurrentReading === true
    );
    const prevReadings = res.readings.filter(
      (rr) => rr.isCurrentReading === false
    );
    const books = await getBookData(currentReadings);
    const prevBooks = await getBookData(prevReadings);
    return {
      data: res,
      currentReadingList: {
        currentBooks: books,
        currentReadings: currentReadings,
      },
      prevReadingList: {
        prevBooks: prevBooks,
        prevReadings: prevReadings,
      },
    };
  }
  if (response.status === 401) {
    throw new UnauthorizedError("You have to be logged in to use this.");
  }

  return undefined;
};

const getBookData = async (currentReadings: ReadingRecord[]) => {
  let books: BookData[] = [];
  for (const rr of currentReadings) {
    const book = await getBookById(rr.bookId);
    if (book) {
      books.push(book);
    }
  }
  return books;
};
