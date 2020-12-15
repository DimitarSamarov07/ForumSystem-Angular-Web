import IBaseModel from "./IBaseModel";
import IUser from "./IUser";
import ICategory from "./ICategory";

export default interface IPost extends IBaseModel {
  content: string;
  title: string;
  author: IUser,
  category: ICategory
  parsedCreated: string
}
