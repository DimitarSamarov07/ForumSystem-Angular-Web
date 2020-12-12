import IBaseModel from "./IBaseModel";
import IUser from "./IUser";

export default interface IPost extends IBaseModel {
  content: string;
  title: string;
  author: IUser
}
