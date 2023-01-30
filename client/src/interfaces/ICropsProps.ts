import { Dispatch, SetStateAction } from 'react';

export interface ICropProps {
  setMainImage: Dispatch<SetStateAction<string>>;
  mainImage: string;
  openMultiPic: boolean;
  setOpenMultiPic: Dispatch<SetStateAction<boolean>>;
  sliderImages:string[];
  setSliderImages:Dispatch<SetStateAction<string[]>>;
}
