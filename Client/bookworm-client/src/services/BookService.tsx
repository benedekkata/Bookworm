import { API_BOOK } from "../helpers/constants";
import { BookData } from "../helpers/interfaces";

export const getBookList = async (query: string): Promise<BookData[]> => {
  const token: string | null = localStorage.getItem("token");
  var res: BookData[] = [];
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  const response: Response = await fetch(
    `${API_BOOK}?searchQuery=${encodeURIComponent(query)}`,
    requestOptions
  );
  if (response.status === 200) {
    res = await response.json();
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
    console.log(res);
    return res;
  }
};
