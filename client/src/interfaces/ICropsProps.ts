import { Dispatch, SetStateAction } from 'react';

export interface ICropProps {
  setMainImage : Dispatch<SetStateAction<string>>;
  mainImage:string;
  }
