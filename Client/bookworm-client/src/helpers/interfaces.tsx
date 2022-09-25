export interface BookData {
  title: string;
  isbn: string;
  isbn13: string;
  publisher: string;
  language: string;
  date_published: string;
  pages?: number;
  image: string;
  synopsis?: string;
  overview?: string;
  authors: string[];
  subjects?: string[];
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
  displayName: string;
  username: string;
}

export interface BookDetails {
  book: BookData;
  reviews: Review[];
}

export interface Review {
  comment: string;
  stars: number;
  userId: string;
  id: number;
  bookId: string;
  bookIsbn: string;
}
