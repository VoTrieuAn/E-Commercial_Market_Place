import { Request } from "express";
import formidable, { File } from "formidable";
import fs from "fs";
import path from "path";

import {
  UPLOAD_IMAGE_DIR,
  UPLOAD_IMAGE_TEMP_DIR,
  UPLOAD_VIDEO_DIR,
} from "../commons/dir";

export const initFolder = () => {
  [UPLOAD_IMAGE_TEMP_DIR, UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR].forEach((dir) => {
    fs.mkdirSync(dir, {
      recursive: true, // Tạo thư mục cha nếu chưa tồn tại (folder nexted)
    });
  });
};

export const handleUploadImage = async (req: Request) => {
  const form = formidable({
    uploadDir: UPLOAD_IMAGE_TEMP_DIR,
    maxFiles: 5,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB cho mỗi file,
    maxTotalFileSize: 5 * 1024 * 1024 * 5, // 25MB cho tổng số file
    filter: function ({ name, originalFilename, mimetype }): boolean {
      const valid = name === "image" && Boolean(mimetype?.includes("image/"));

      if (!valid) {
        form.emit("error" as any, new Error("File type is not valid") as any);
      }
      // Chỉ cho phép upload file ảnh
      return valid;
    },
  });

  return new Promise<File[]>((resolve, reject) => {
    console.log("Chạy vào đây");
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }

      console.log(files);

      if (!files.image) {
        return reject(new Error("File is empty"));
      }

      resolve(files.image as File[]);
    });
  });
};

export const handleUploadVideo = async (req: Request) => {
  // Cách để có được định dạng idname/idname.mp4
  // ✅Cách 1: Tạo unique id cho video ngay từ đầu
  // ❌Cách 2: Đợi video upload xong rồi tạo folder, move video vào

  const nanoid = (await import("nanoid")).nanoid;
  const idName = nanoid();
  const folderPath = path.resolve(UPLOAD_VIDEO_DIR, idName);
  fs.mkdirSync(folderPath);
  const form = formidable({
    uploadDir: folderPath,
    maxFiles: 1,
    maxFileSize: 50 * 1024 * 1024, // 50MB cho mỗi file,
    maxTotalFileSize: 250 * 1024 * 1024, // 250MB cho tổng số file
    filter: function ({ name, originalFilename, mimetype }): boolean {
      const valid =
        name === "video" &&
        Boolean(mimetype?.includes("mp4") || mimetype?.includes("quicktime"));

      if (!valid) {
        form.emit("error" as any, new Error("File type is not valid") as any);
      }
      // Chỉ cho phép upload file video
      return valid;
    },
    filename: function () {
      return idName;
    },
  });

  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }

      if (!Boolean(files.video)) {
        return reject(new Error("File is empty"));
      }
      // Đổi tên đuôi file vì keppExtensions của formidable bị lỗi nếu .abc.mp4 thì sẽ lưu thành .abc
      const videos = files.video as File[];

      videos.forEach((video) => {
        const ext = getExtension(video.originalFilename as string);
        fs.renameSync(video.filepath, `${video.filepath}.${ext}`); // Đổi tên file
        video.newFilename = `${video.newFilename}.${ext}`; // Cập nhật tên file mới trong formidable
        video.filepath = `${video.filepath}.${ext}`; // Cập nhật đường dẫn file mới trong formidable
      });

      resolve(files.video as File[]);
    });
  });
};

export const getNameFormFullName = (fullName: string) => {
  const nameArr = fullName.split(".");
  nameArr.pop(); // Loại bỏ phần mở rộng

  return nameArr.join("");
};

export const getExtension = (fileName: string) => {
  const nameArr = fileName.split(".");
  return nameArr[nameArr.length - 1] || ""; // Trả về phần mở rộng cuối cùng hoặc chuỗi rỗng nếu không cóq
};
