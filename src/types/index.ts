export interface User {
  id: string;
  email: string;
  fullName: string;
  skills?: string[];
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresIn: number;
}

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
}

export interface SignInData {
  email: string;
  password: string;
  rememberMe?: boolean;
}