import IBaseModel from "./IBaseModel";

export default interface IVote extends IBaseModel {
  post: string,
  user: string,
  polarity: boolean
}
