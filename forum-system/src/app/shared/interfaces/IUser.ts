import IBaseModel from "./IBaseModel";
import IPost from "./IPost";

export default interface IUser extends IBaseModel {
  email: string,
  isAdmin: boolean,
  karmaPoints: number,
  profileImageUrl: string,
  username: string,
  posts: IPost[]
}
