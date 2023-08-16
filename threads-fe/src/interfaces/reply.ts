import { IUser } from "./user";

export interface IReply {
  id?: number;
  content?: string;
  user: IUser;
}

export interface IReplyPost {
  content?: string;
  thread_id?: number;
}
