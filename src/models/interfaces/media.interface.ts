import { MediaType } from "../enum/media.enum";

export interface Media {
  url: string; // Đường dẫn đến ảnh đã upload
  type: MediaType; // Loại media (ảnh, video, ...)
}
