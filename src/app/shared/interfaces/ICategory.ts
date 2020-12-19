import IBaseModel from "./IBaseModel";
import IPost from "./IPost";

export default interface ICategory extends IBaseModel {
  imageUrl: string,
  description: string,
  title: string,
  isRecentCategory: boolean,
  posts: IPost[],
  usersCount: number;
  postsCount: number;
}
