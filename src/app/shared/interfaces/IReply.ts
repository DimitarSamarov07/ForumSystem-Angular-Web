import IBaseModel from "./IBaseModel";
import IPost from "./IPost";
import IUser from "./IUser";

export default interface IReply extends IBaseModel {
  post: IPost;
  author: IUser;
  content: string,
  parsedCreated: string,
}
