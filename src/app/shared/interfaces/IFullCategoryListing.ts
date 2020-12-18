import ICategoryDetailsList from "./ICategoryDetailsList";

export default interface IFullCategoryListing extends ICategoryDetailsList {
  usersCount: number;
  postsCount: number;
}
