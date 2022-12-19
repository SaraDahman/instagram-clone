export interface IFakeUser {
  username: string;
  name: string;
  email: string;
  password: string;
  private: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IFakePost {
  caption: string;
  media: string[];
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IFakeFollowing {
  followerId: number;
  followedId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IFakeComment {
  comment: string;
  userId: number;
  postId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IFakeLike {
  userId: number;
  postId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IFakeStory {
  media: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IFakeViewers {
  storyId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}
