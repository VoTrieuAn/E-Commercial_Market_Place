import { IAuthRequest } from "./auth.interface";

export interface IFeedbackUpLoad extends IAuthRequest {
  images?: Express.Multer.File[];
}
