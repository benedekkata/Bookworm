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
export interface HomeProps {
  testData: BookData[];
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
  expiresAt: string;
}