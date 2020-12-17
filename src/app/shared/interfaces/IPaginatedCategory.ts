import ICategory from "./ICategory";

export default interface IPaginatedCategory {
  data: ICategory[],
  totalDataLength: number
}
