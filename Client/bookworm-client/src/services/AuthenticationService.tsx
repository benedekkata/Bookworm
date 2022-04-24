import { API_AUTH } from "../helpers/constants";
import { LoginData, LoginResponse, RegisterData } from "../helpers/interfaces";

export const isAuthenticated = async (): Promise<boolean> => {
  const token: string | null = localStorage.getItem("token");
  //check if the token is there and valid
  if (!token || !(await isValidAsync(token))) return false;

  //check expires at if expired but the refresh token is there ask for a newOne
  const expiresAt: string | null = localStorage.getItem("expiresAt");
  if (expiresAt) {
    const date: number = Date.parse(expiresAt);
    if (date <= Date.now()) {
      const refreshToken: string | null = localStorage.getItem("refreshToken");
      if (refreshToken) {
        const refreshed: boolean = await refreshTokenAsync(
          token,
          refreshToken
        ).catch();
        if (!refreshed) return false;
      } else {
        return false;
      }
    }
  }
  return true;
};

export const signUp = (body: RegisterData) => {
  console.log("registered");
};

export const signIn = async (body: LoginData) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const response: Response = await fetch(`${API_AUTH}/login`, requestOptions);

  if (response.status === 200) {
    const data: LoginResponse = await response.json();
    saveLoginResponse(data);
  }
};

export const signOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("expiresAt");
};

const isValidAsync = async (token: string): Promise<boolean> => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(token),
  };

  const response: Response = await fetch(
    `${API_AUTH}/validate-token`,
    requestOptions
  );
  if (response.status === 200) {
    return true;
  }
  return false;
};

const refreshTokenAsync = async (
  token: string,
  refresh_token: string
): Promise<boolean> => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token, refreshToken: refresh_token }),
  };

  const response: Response = await fetch(
    `${API_AUTH}/refresh-token`,
    requestOptions
  );
  if (response.status === 200) {
    const data: LoginResponse = await response.json();
    saveLoginResponse(data);
    return true;
  }
  return false;
};

const saveLoginResponse = (data: LoginResponse) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem("userId", data.userId);
  localStorage.setItem("expiresAt", data.expiresAt);
};
