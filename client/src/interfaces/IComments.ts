import { IPost } from './IPost';

export interface IComment {
id:string;
comments:string;
}

export interface IPostsComments {
  comments : IComment[]
  posts :IPost[]
}
