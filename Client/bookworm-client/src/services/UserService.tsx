import { API_SETTING } from "../helpers/constants";
import { PasswordChange, UserData } from "../helpers/interfaces";
import { BadRequestError, UnauthorizedError } from "../helpers/utils";

export const getUserSettings = async (): Promise<UserData | undefined> => {
  const token: string | null = localStorage.getItem("token");
  const userId: string | null = localStorage.getItem("userId");

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  const response: Response = await fetch(
    `${API_SETTING}/${userId}`,
    requestOptions
  );

  if (response.status === 200) {
    const res: UserData = await response.json();
    return res;
  }

  if (response.status === 401) {
    throw new UnauthorizedError("You have to be logged in to use this.");
  }

  return undefined;
};

export const updateUserSettings = async (data: UserData) => {
  const token: string | null = localStorage.getItem("token");
  const userId: string | null = localStorage.getItem("userId");

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };

  const response: Response = await fetch(
    `${API_SETTING}/${userId}`,
    requestOptions
  );
  if (response.status === 200) {
    return true;
  }
  if (response.status === 400) {
    const msg = await response.text();
    throw new BadRequestError(msg);
  }

  if (response.status === 401) {
    throw new UnauthorizedError("You have to be logged in to use this.");
  }

  return false;
};

export const changePassword = async (data: PasswordChange) => {
  const uid: string = localStorage.getItem("userId") || "";
  const token: string | null = localStorage.getItem("token");
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };

  const res = await fetch(
    `${API_SETTING}/changepassword/${uid}`,
    requestOptions
  ).catch();
  if (res.status === 200) {
    return true;
  }
  if (res.status === 400) {
    const msg = await res.text();
    throw new BadRequestError(msg);
  }
  if (res.status === 401) {
    throw new UnauthorizedError("You have to be logged in to use this.");
  }
  return false;
};
