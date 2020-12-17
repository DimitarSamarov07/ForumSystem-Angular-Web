import IBaseModel from "./IBaseModel";

export default interface ICategory extends IBaseModel {
  imageUrl: string,
  description: string,
  title: string,
  isRecentCategory: boolean
}
