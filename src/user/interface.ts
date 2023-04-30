export interface UserById {
  id: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface UserList<T> {
  users: T[];
}

export interface UserResponse<T> {
  status: number;
  error: string[] | undefined;
  data: T | T[] | undefined;
}

export interface Empty {}

export interface UserService {
  getUserById(request: UserById): Promise<UserResponse<User>>;
  getAllUsers(request: Empty): Promise<UserList<User>>;
}

export const USER_PACKAGE_NAME = 'user';
export const USER_SERVICE_NAME = 'UserService';
