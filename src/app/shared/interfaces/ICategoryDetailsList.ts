import ICategory from "./ICategory";
import IPost from "./IPost";

export default interface ICategoryDetailsList extends ICategory {
  posts: IPost[],
  searchQuery: string
}
