import { Request } from "express";
import { UPLOAD_IMAGE_DIR } from "../commons/dir";
import {
  getNameFormFullName,
  handleUploadImage,
  handleUploadVideo,
} from "../utils/file";
import { Media } from "../models/interfaces/media.interface";
import path from "path";
import sharp from "sharp";
import { uploadFileToS3 } from "../utils/s3";
import mime from "mime";
import fsPromises from "fs/promises";
import { MediaType } from "../models/enum/media.enum";
import { CompleteMultipartUploadCommandOutput } from "@aws-sdk/client-s3";

class MediaService {
  static async uploadImage(req: Request) {
    const files = await handleUploadImage(req);

    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFormFullName(file.newFilename);
        const newFullFileName = `${newName}.jpg`; // Đổi tên file mới với định dạng jpg
        const newPath = path.resolve(UPLOAD_IMAGE_DIR, newFullFileName);
        await sharp(file.filepath)
          .jpeg({
            quality: 50, // Chất lượng ảnh (0-100)
            progressive: true, // Nén ảnh theo kiểu progressive
          })
          .toFile(newPath); // Lưu lại file với định dạng jpeg
        // Tiến hành upload file lên S3
        const s3Result = await uploadFileToS3({
          filename: newFullFileName,
          filepath: newPath,
          contentType: mime.getType(newPath) as string,
        });

        await Promise.all([
          // Xoá file tạm trong thư mục uploads/images/temp sau khi đã chuyển đổi
          fsPromises.unlink(file.filepath),
          // Xoá file đã upload lên S3 sau khi đã lưu vào cơ sở dữ liệu
          fsPromises.unlink(newPath),
        ]);

        return {
          url: s3Result.Location as string, // Trả về đường dẫn ảnh đã up load lên S3
          type: MediaType.Image,
        };
      })
    );

    return result;
  }

  static async uploadVideo(req: Request) {
    const files = await handleUploadVideo(req);

    const result = await Promise.all(
      files.map(async (file) => {
        const s3Result = await uploadFileToS3({
          filename: "videos/" + file.newFilename,
          contentType: mime.getType(file.filepath) as string,
          filepath: file.filepath,
        });
        fsPromises.unlink(file.filepath);

        return {
          url: (s3Result as CompleteMultipartUploadCommandOutput)
            .Location as string,
          type: MediaType.Video,
        };
      })
    );

    return result;
  }
}

export default MediaService;
