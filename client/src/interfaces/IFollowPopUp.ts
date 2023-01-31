export interface IFollowPopUp {
  isOpen: boolean,
  setIsOpen: (val: boolean) => void,
  type: string,
  userId: number | undefined,
}
