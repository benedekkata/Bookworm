import { API_USERAPPDATA } from "../helpers/constants";
import {
  BookData,
  BookShelf,
  MyPageData,
  MyPageDataProps,
  ReadingRecord,
} from "../helpers/interfaces";
import { BadRequestError, UnauthorizedError } from "../helpers/utils";
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
    const books = await getBookDataFromReadingRecord(currentReadings);
    const prevBooks = await getBookDataFromReadingRecord(prevReadings);
    const wishlist = res.bookShelves.find((bs) => bs.name === "Wishlist");
    const wishlistBooks = wishlist ? await getBookData(wishlist) : [];

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
      wishlistBooks: wishlistBooks,
    };
  }
  if (response.status === 401) {
    throw new UnauthorizedError("You have to be logged in to use this.");
  }

  return undefined;
};

const getBookDataFromReadingRecord = async (
  currentReadings: ReadingRecord[]
) => {
  let books: BookData[] = [];
  for (const rr of currentReadings) {
    const book = await getBookById(rr.bookId ? rr.bookId : "");
    if (book) {
      books.push(book);
    }
  }
  return books;
};

const getBookData = async (bookIds: BookShelf) => {
  let books: BookData[] = [];
  for (const bs of bookIds.bookIds) {
    const book = await getBookById(bs);
    if (book) {
      books.push(book);
    }
  }
  return books;
};

export const saveBook = async (
  record: ReadingRecord,
  isbn: string | undefined
): Promise<boolean> => {
  const token: string | null = localStorage.getItem("token");
  const uid: string | null = localStorage.getItem("userId");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ ...record, userId: uid, bookId: "" }),
  };

  const response: Response = await fetch(
    `${API_USERAPPDATA}/savebook/${isbn}`,
    requestOptions
  );
  if (response.status === 200) {
    return true;
  }
  if (response.status === 401) {
    throw new UnauthorizedError("You have to be logged in to use this.");
  }
  if (response.status === 400 || response.status === 401) {
    const msg = await response.text();
    throw new BadRequestError(msg);
  }

  return false;
};

export const saveBookWishList = async (
  isbn: string | undefined
): Promise<boolean> => {
  const token: string | null = localStorage.getItem("token");
  const uid: string | null = localStorage.getItem("userId");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  const response: Response = await fetch(
    `${API_USERAPPDATA}/savewishlist/${isbn}?uid=${uid}`,
    requestOptions
  );
  if (response.status === 200) {
    return true;
  }
  if (response.status === 401) {
    throw new UnauthorizedError("You have to be logged in to use this.");
  }
  if (response.status === 400 || response.status === 401) {
    const msg = await response.text();
    throw new BadRequestError(msg);
  }

  return false;
};

export const saveBioAndPreferedTypes = async (
  bio: string | undefined,
  pTypes: string | undefined
): Promise<boolean> => {
  const token: string | null = localStorage.getItem("token");
  const uid: string | null = localStorage.getItem("userId");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  const responseBio: Response = await fetch(
    `${API_USERAPPDATA}/editbio/${uid}`,
    { ...requestOptions, body: JSON.stringify({ text: bio }) }
  );
  const types = pTypes?.split(";").map((pt) => {
    return { type: pt };
  });
  const responsePtype: Response = await fetch(
    `${API_USERAPPDATA}/editpreferedtypes/${uid}`,
    { ...requestOptions, body: JSON.stringify(types) }
  );
  if (responseBio.status === 200 && responsePtype.status === 200) {
    return true;
  }
  if (responseBio.status === 401 || responsePtype.status === 401) {
    throw new UnauthorizedError("You have to be logged in to use this.");
  }
  if (responseBio.status === 400 || responseBio.status === 401) {
    const msg = await responseBio.text();
    throw new BadRequestError(msg);
  }

  if (responsePtype.status === 400 || responsePtype.status === 401) {
    const msg = await responsePtype.text();
    throw new BadRequestError(msg);
  }

  return false;
};

export const deleteReadingRecord = async (
  readingRecord: ReadingRecord | undefined
): Promise<boolean> => {
  const token: string | null = localStorage.getItem("token");

  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(readingRecord),
  };

  const response: Response = await fetch(
    `${API_USERAPPDATA}/readingrecord`,
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
export const deleteReadingRecordByBookId = async (
  bookId: string
): Promise<boolean> => {
  const token: string | null = localStorage.getItem("token");
  const uid: string | null = localStorage.getItem("userId");

  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      userId: uid,
      bookId: bookId,
      isCurrentReading: false,
      isMyCopy: false,
    } as ReadingRecord),
  };

  const response: Response = await fetch(
    `${API_USERAPPDATA}/readingrecord`,
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

export const finishReadingABook = async (
  readingRecord: ReadingRecord | undefined
): Promise<boolean> => {
  const token: string | null = localStorage.getItem("token");

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(readingRecord),
  };

  const response: Response = await fetch(
    `${API_USERAPPDATA}/readingrecord/finishbook`,
    requestOptions
  );
  if (response.status === 200) {
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

export const editReadingRecord = async (
  readingRecord: ReadingRecord | undefined
): Promise<boolean> => {
  const token: string | null = localStorage.getItem("token");

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(readingRecord),
  };

  const response: Response = await fetch(
    `${API_USERAPPDATA}/readingrecord/`,
    requestOptions
  );
  if (response.status === 200) {
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

export const getReadingRecord = async (
  bookId: string
): Promise<ReadingRecord | undefined> => {
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
    `${API_USERAPPDATA}/readingrecord?bookId=${bookId}&userId=${uid}`,
    requestOptions
  );
  if (response.status === 200) {
    const res: ReadingRecord = await response.json();

    return res;
  }
  if (response.status === 401) {
    throw new UnauthorizedError("You have to be logged in to use this.");
  }

  return undefined;
};
