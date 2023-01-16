export interface IUser {
  image: string,
  name: string,
  username: string,
}

export interface ILikes{
  createdAt: string,
  postId: number,
  updatedAt: string,
  user: IUser,
  userId:number,
}

export interface IPostDetails {
  archived: boolean,
  caption: string,
  createdAt: string,
  id: string,
  likes: ILikes[],
  media: string[],
  updatedAt: string,
  user: IUser,
  userId: number,
}

export interface IComment {
  comment: string,
  createdAt: string,
  id: string,
  postId: number,
  updatedAt: string,
  user: IUser,
  userId: number,
}
