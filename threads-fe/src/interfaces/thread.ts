import { IUser } from "./user";

export interface IThreadPost {
  content: string;
  image?: string;
}

export interface IThreadCard {
  id?: number;
  user: IUser;
  posted_at?: string;
  content?: string;
  image?: string;
  likes_count?: number;
  replies_count?: number;
  is_liked: boolean;
}
