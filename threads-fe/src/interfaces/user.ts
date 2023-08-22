export interface IUser {
  id?: number;
  full_name?: string;
  username?: string;
  email?: string;
  picture?: string;
  description?: string;
  followers_count?: number;
  followings_count?: number;
}

export interface IUserRegister {
  full_name: string;
  username: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}
