export interface Movie {
  _id: string;
  poster_url: string;
  title: string;
  release_date: string;
  original_language: string;
  overview: string;
  original_title: string;
  backdrop_url: string;
  isBookmarked: boolean;
}

export interface Series {
  _id: string;
  poster_url: string;
  name: string;
  first_air_date: string;
  original_language: string;
  overview: string;
  original_name: string;
  backdrop_url: string;
  isBookmarked: boolean;
}

export interface FormInput {
  username: string;
  email: string;
  password: string;
  passwordTest: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
}
