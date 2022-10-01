export interface BookData {
  title: string;
  isbn: string;
  isbn13: string;
  publisher: string;
  language: string;
  datePublished: string;
  pages?: number;
  image: string;
  synopsis?: string;
  overview?: string;
  authors: string[];
  subjects?: string[];
}

export interface ReviewData {
  _id: string;
  author: string;
  text: string;
  author_id: string;
  points: number;
}

export interface LoginData {
  emailAddress: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  userId: string;
  expiresAt: string;
}

export interface RegisterData {
  emailAddress: string;
  password: string;
  passwordVerification: string | undefined;
  displayName: string;
  username: string;
}

export interface Review {
  id: number;
  comment: string;
  userId: string;
  bookId: string;
  bookIsbn: string;
  stars: number;
}

export interface UnauthorizedError extends Error {}
