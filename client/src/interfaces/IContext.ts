import { Dispatch, SetStateAction } from 'react';

interface IUser {
  email: string,
  id: number,
  image: string,
  name: string,
  username: string
  bio:string
}

export interface IContext {
  user:IUser | null,
  setUser: Dispatch<SetStateAction<IUser | null>>
}
