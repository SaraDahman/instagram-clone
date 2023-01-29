export interface ICommentProps{
  username:string,
  image:string,
  comment:string,
  createdAt:string,
  id:string,
  postId:string,
  userId:number,
  setDeletedComments:Function,
}
